import { FC } from "react";
import { useTranslation, Trans } from "react-i18next";
import { usePaymentStore } from "~/db/paymentStore";
import { generateRandomPrefix, generateRandomSymbol } from "~/utils";

const getEstimatedTime = () => {
  return "12-24 hours";
};

export const PaidSymbols: FC = () => {
  const { t } = useTranslation();
  const { price, value } = usePaymentStore();
  const estimatedTime = getEstimatedTime();

  return (
    <>
      <div className="flex flex-col gap-y-3 py-1.5">
        <div className="flex flex-col gap-y-1 px-1">
          <p className="text-muted-foreground font-semibold text-sm">
            <Trans>{t("example_address")}</Trans>
          </p>
          <p className="font-semibold text-sm">
            {generateRandomPrefix()}...
            {value.length === 3 && <span>{generateRandomSymbol()}</span>}
            <span className="text-primary">{value}</span>
          </p>
        </div>
        <div className="flex gap-x-11 px-1">
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-foreground font-semibold text-sm">
              <Trans>{t("price")}</Trans>
            </p>
            <p className="font-semibold text-sm">
              <span>{price}</span> TON
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-foreground font-semibold text-sm">
              <Trans>{t("estimated_time")}</Trans>
            </p>
            <p className="font-semibold text-sm">{estimatedTime}</p>
          </div>
        </div>
      </div>
    </>
  );
};
