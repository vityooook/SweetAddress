import { FC } from "react";
import { useTranslation, Trans } from "react-i18next";
import { generateShortTonAddress } from "~/utils";

export const FreeSymbols: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex w-full flex-col gap-y-3 px-1">
        <p className="font-semibold text-sm">
          <Trans>{t("sweet_description")}</Trans>
        </p>
        <div className="flex gap-1 items-start">
          <div className="flex flex-col max-w-full overflow-hidden truncate font-semibold text-sm">
            <span>{generateShortTonAddress()}</span>
            <div className="h-1 border border-t-0 border-current"></div>
            <p className="font-semibold text-muted-foreground text-[9px] uppercase self-center mt-1">
              <Trans>{t("random_generated_address")}</Trans>
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-primary text-sm self-start">
              _TON
            </p>
            <div className="h-1 border border-t-0 border-primary"></div>
            <p className="font-semibold opacity-75 text-muted-foreground text-[9px] uppercase self-center mt-1">
              <Trans>{t("sweet_suffix")}</Trans>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
