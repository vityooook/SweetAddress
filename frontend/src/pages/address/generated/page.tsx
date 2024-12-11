import { useBack } from "~/hooks/useBack";
import { useNavigate } from "react-router-dom";
import { CheckCheck } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Copy } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";

const mockDataSeed = [
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
  "town",
];

export const GeneratedAddressPage: React.FC = () => {
  useBack("/");
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="h-dvh flex flex-col py-6">
      <h1 className="text-3xl font-bold">
        <Trans>{t("address_generated")}</Trans>
      </h1>
      <p className="text-sm font-bold mt-2 break-words">
        <span>
          UQD6XnPn55zFuTJolK9EWUdeyFCxC84MK_UXOjcLoma9Jtjm
          <span className="text-primary">habbit</span>
        </span>
        <Copy
          className="w-4 h-4 text-muted-foreground cursor-pointer inline-block ml-2"
          strokeWidth={3}
        />
      </p>
      <Card className="w-full mt-4 p-10 d-flex justify-center">
        <div className="grid grid-cols-2">
          <div className="flex flex-col text-muted-foreground text-sm font-semibold">
            {mockDataSeed.slice(0, 12).map((item, index) => (
              <p className="flex gap-1" key={index + 1}>
                <span>{index + 1}.</span>
                <span className="break-words w-full">{item}</span>
              </p>
            ))}
          </div>
          <div className="flex flex-col text-muted-foreground text-sm font-semibold">
            {mockDataSeed.slice(12, 24).map((item, index) => (
              <p className="flex gap-1" key={index + 12}>
                <span>{index + 13}.</span>
                <span className="break-words w-full">{item}</span>
              </p>
            ))}
          </div>
        </div>
      </Card>
      <div className="flex flex-col gap-2 mt-2">
        <Button
          className="w-full flex items-center gap-2"
          size="lg"
          variant="secondary"
        >
          <Trans>{t("copy_seed_phrase")}</Trans>
          <Copy className="w-6 h-6 dark:text-black text-white" />
        </Button>
        <Button onClick={() => navigate("/")} className="w-full" size="lg">
          <Trans>{t("delete_permanently")}</Trans>
        </Button>
        <div className="flex items-center gap-3 px-1 mt-4">
          <CheckCheck className="text-primary w-6 h-6" />
          <p className="font-bold text-sm">
            <Trans>{t("seed_phrase_will_deleted")}</Trans>
          </p>
        </div>
      </div>
    </main>
  );
};
