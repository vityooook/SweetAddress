import { useBack } from "~/hooks/useBack";
import { useNavigate } from "react-router-dom";
import { AlarmClockCheck } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useTranslation, Trans } from "react-i18next";
import { useMatrixRain } from "~/hooks/useMatrixRain";

export const GeneratingAddressPage: React.FC = () => {
  const { t } = useTranslation();
  const { canvasRef } = useMatrixRain();
  const navigate = useNavigate();
  useBack("/");

  return (
    <main>
      <Card className="flex flex-col gap-y-5 items-center overflow-hidden pb-6">
        <div className="relative w-full h-72 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold z-10 break-words w-full text-center">
            UQD6XgsEKm<span className="text-primary">habbit</span>
          </h1>
          <canvas ref={canvasRef} className="absolute z-0" />
        </div>
        <p className="font-bold text-lg mx-11">
          <Trans>{t("generating_address")}</Trans>
        </p>
        <div className="flex items-center gap-3 mx-11">
          <AlarmClockCheck className="text-primary w-9 h-9" />
          <p className="font-bold text-sm">
            <Trans>{t("you_notified")}</Trans>
          </p>
        </div>
      </Card>
      <Button
        onClick={() => navigate("/")}
        className="w-full mt-8"
        variant="secondary"
      >
        <Trans>{t("start_another")}</Trans>
      </Button>
    </main>
  );
};
