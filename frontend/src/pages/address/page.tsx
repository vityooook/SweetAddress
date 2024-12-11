import { GeneratingAddressPage } from "./generating/page";
import { useAddress } from "~/hooks/useAddress";

export const AddressPage: React.FC = () => {
  const { data: address } = useAddress();

  if (address?.status === 'pending') {
    return <GeneratingAddressPage />;
  }

  return <></>
};
