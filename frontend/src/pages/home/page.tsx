import { useBackButton } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { orderSchema, OrderFormData } from "./zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { RadioButtons } from "./items/radio-buttons";
import { CurrentAddresses } from "./items/current-addresses";
import { ShieldCheck } from "lucide-react";
import { FreeSymbols } from "./items/free-symbolds";
import { PaidSymbols } from "./items/paid-symbols";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useMutation } from "@tanstack/react-query";
import { checkOrder, createOrder, deleteOrder } from "~/api/backend";
import { useTranslation, Trans } from "react-i18next";
import { useDebounce } from "~/hooks/useDebounce";
import { usePaymentStore, MAX_VALUE, MIN_VALUE } from "~/db/paymentStore";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TonSDK } from "~/lib/ton";

export const HomePage: React.FC = () => {
  const bb = useBackButton();
  const { t } = useTranslation();
  const { updatePrice, setCurrentRange, currentRange } = usePaymentStore();
  const [symbolsLeft, setSymbolsLeft] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const { price } = usePaymentStore();
  const navigate = useNavigate();

  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(
    <FreeSymbols />
  );

  const handleChangeInput = (value: string) => {
    if (value.length > MIN_VALUE) {
      setSymbolsLeft(MAX_VALUE - value.length);
    }
    setInputValue(value);
    debounceCallback(value);
  };

  const updateValueForm = (value: string) => {
    updatePrice(value);
    if (value.length <= MIN_VALUE && currentRange !== "free") {
      setRenderedContent(<FreeSymbols />);
      setCurrentRange("free");
    } else if (value.length > MIN_VALUE && currentRange !== "paid") {
      setRenderedContent(<PaidSymbols />);
      setCurrentRange("paid");
    }
  };

  const { debounceCallback } = useDebounce(updateValueForm, 500);
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      suffix: "",
    },
  });

  const userAddress = useTonAddress();
  const [tonConnect] = useTonConnectUI();
  const tonSDK = new TonSDK(tonConnect);

  const createOrderMutation = useMutation({
    mutationFn: (orderData: any) => createOrder(orderData),
  });

  const checkOrderMutation = useMutation({
    mutationFn: (orderId: number) => checkOrder(orderId),
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId: number) => deleteOrder(orderId),
  });

  const handleSubmit: SubmitHandler<OrderFormData> = async (formData) => {
    const { queryId, nanoAmount, masterAddress, _id } =
      await createOrderMutation.mutateAsync(formData);

    try {
      await tonSDK.payOrder(queryId, nanoAmount, 90, masterAddress);
      checkOrderMutation.mutate(_id);

      navigate(`address/${_id}`);
    } catch (e) {
      deleteOrderMutation.mutate(_id);
    }
  };

  useEffect(() => {
    bb.hide();
  }, [bb]);

  useEffect(() => {
    if (userAddress) form.setValue("userAddress", userAddress);
  }, [userAddress]);

  return (
    <main className="flex flex-col py-6">
      <h1 className="text-3xl font-display tracking-tighter font-bold">
        <Trans components={[<span className="text-primary" />]}>
          {t("generate_address")}
        </Trans>
      </h1>
      <div className="flex flex-col gap-y-4 mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <RadioButtons />

            <FormField
              control={form.control}
              name="suffix"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <div className="flex flex-col items-center gap-2 relative">
                    <FormControl>
                      <Input
                        className="font-bold text-lg px-6"
                        {...field}
                        placeholder={t("enter_symbols")}
                        onInput={(event) => {
                          const input = (event.target as HTMLInputElement)
                            .value;
                          const filteredInput = input.replace(
                            /[^a-zA-Z0-9_-]/g,
                            ""
                          ); // Allow only Latin letters, numbers, and _
                          handleChangeInput(filteredInput); // Pass the filtered value to your handler
                          onChange(filteredInput); // Update the form state
                        }}
                        maxLength={MAX_VALUE}
                      />
                    </FormControl>
                    {inputValue.length > MIN_VALUE && (
                      <p className="absolute h-full flex items-center right-3 overflow-hidden z-10 bg-card px-1 text-muted-foreground text-xs font-semibold">
                        <span>
                          {symbolsLeft} <Trans>{t("symbols_left")}</Trans>
                        </span>
                      </p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <>{renderedContent}</>

            {userAddress ? (
              <Button className="w-full mt-6" size="lg">
                <p>{t("generate_for_ton", { ton: price })}</p>
              </Button>
            ) : (
              <Button className="w-full mt-6" size="lg">
                <Trans>{t("connect_wallet")}</Trans>
              </Button>
            )}
          </form>
        </Form>
      </div>
      <div className="flex items-center justify-center gap-2 px-1 mt-4">
        <ShieldCheck className="text-primary" />
        <p className="font-semibold text-sm">
          <Trans>{t("store_seedphrase")}</Trans>
        </p>
      </div>
      <CurrentAddresses />
    </main>
  );
};
