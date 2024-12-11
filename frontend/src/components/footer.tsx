import { Link } from "react-router-dom";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { Headset } from "lucide-react";
import { LanguageSwitcher } from "./languge-switcher";
import { Trans, useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="flex justify-between items-center mt-auto">
      <p className="text-sm">
        <Trans components={[<span className="text-primary" />]}>
          {t("created_by")}
        </Trans>
      </p>
      <div className="flex gap-2 items-center">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Button asChild size="icon" variant="ghost" className="text-foreground">
          <Link to="https://t.me/tmadevs_support/9" target="_blank">
            <Headset className="text-foreground w-5 h-5" />
          </Link>
        </Button>
      </div>
    </footer>
  );
};
