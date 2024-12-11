import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "~/api/backend";
import { useParams } from "react-router-dom";

export const useAddress = () => {
  const { addressId } = useParams();

  return useQuery({
    queryKey: ["addresses", addressId],
    queryFn: async () => {
      return fetchAddress(addressId as string);
    },
    enabled: !!addressId,
  });
};
