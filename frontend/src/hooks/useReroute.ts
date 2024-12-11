import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "~/db/userStore";

export const REDIRECT_KEY = "redirect-after-onboarding";

export const useReroute = () => {
  const navigate = useNavigate();
  const launchParams = useLaunchParams();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (launchParams.startParam) {
      if (launchParams.startParam?.includes("address")) {
        const addressId = launchParams.startParam.split("address-")[1];

        if (user.isOnboarded) {
          navigate(`/address/${addressId}`);
        } else {
          window.localStorage.setItem(REDIRECT_KEY, `/addresses/${addressId}`);
        }
      }
    }
  }, [user]);
};
