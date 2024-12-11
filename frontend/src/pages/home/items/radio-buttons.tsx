import { FC } from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useTranslation, Trans } from "react-i18next";
import { Badge } from "~/components/ui/badge";

export const RadioButtons: FC = () => {
  const { t } = useTranslation();
  return (
    <RadioGroup className="flex gap-2 items-center" defaultValue="wallet">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="wallet" id="wallet">
          <Trans>{t("wallet_address")}</Trans>
        </RadioGroupItem>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="token" id="token" disabled>
          <Trans>
            {t("token_address")} <Badge>Soon</Badge>
          </Trans>
        </RadioGroupItem>
      </div>
    </RadioGroup>
  );
};
