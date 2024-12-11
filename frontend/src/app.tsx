import { Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  useMainButton,
  useMiniApp,
  useThemeParams,
} from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { Toaster } from "~/components/ui/toaster";
import { useTheme } from "./providers/shadcn-provider";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { useReroute } from "./hooks/useReroute";
import { useWalletAuth } from "~/hooks/useWalletAuth.tsx";

function App() {
  useAuth();
  useWalletAuth();
  useReroute();

  const theme = useTheme();
  const themeParams = useThemeParams();
  const miniApp = useMiniApp();
  const mb = useMainButton();

  useEffect(() => {
    mb.setBgColor("#20d2df").setTextColor("#000000");
  }, [mb]);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    theme.setTheme(themeParams.isDark ? "dark" : "light");
    miniApp.setBgColor("#1F1F1F");
    miniApp.setHeaderColor(themeParams.isDark ? "#000000" : "#ffffff");
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    document.documentElement.classList.add("twa");
    miniApp.ready();
    miniApp.requestWriteAccess();
  }, []);

  return (
    <div className="container max-w-xl py-4 h-dvh flex flex-col">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
