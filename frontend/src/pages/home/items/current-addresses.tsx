import { FC } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Card } from "~/components/ui/card";
import { CircleCheck, LoaderCircle, Copy } from "lucide-react";
import { useAddresses } from "~/hooks/useAddresses";
import { generateRandomPrefix } from "~/utils";

export const CurrentAddresses: FC = () => {
  const { t } = useTranslation();
  const { data: addresses } = useAddresses();

  return (
    <div className="flex flex-col gap-3 mt-20">
      <p className="text-muted-foreground font-bold text-sm">
        <Trans>{t("all_addresses")}</Trans>
      </p>
      <div className="flex flex-col gap-2">
        {addresses?.map((item) => {
          return (
            <Card
              className="px-4 py-3 flex items-center justify-between"
              key={item._id}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-base">
                    <span>{generateRandomPrefix()}</span>
                    {"..."}
                    <span className="text-primary">{item.suffix}</span>
                  </p>
                  <Copy
                    className="w-4 h-4 cursor-pointer text-muted-foreground"
                    strokeWidth={3}
                  />
                </div>
                <p className="font-medium text-xs text-muted-foreground">
                  {item.status === "pending"
                    ? t("generating_about")
                    : t("generated_about")}
                </p>
              </div>
              {item.status === "pending" ? (
                <LoaderCircle className="text-primary animate-spin" />
              ) : (
                <CircleCheck className="text-primary" />
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
