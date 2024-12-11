import { TonConnectButton } from "@tonconnect/ui-react";
import { useUserStore } from "~/db/userStore";
import { Logo } from "./logo";

export const Header = () => {
  const { user } = useUserStore();

  return (
    <header className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-2">
        <Logo className="h-14" />
      </div>
      <div className="flex items-center gap-2">
        <img
          src={`https://unavatar.io/telegram/${user.username}`}
          className="w-8 h-8 border-2 border-primary rounded-full"
          alt=""
        />
        <div className="[&_button]:bg-card [&_button_div]:text-card-foreground">
          <TonConnectButton />
        </div>
      </div>
    </header>
  );
};
