import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { fetchAddresses } from "~/api/backend";

export const useAddresses = () => {
  const isFetchingRef = useRef(false); // Ref to track if a fetch is in progress

  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      isFetchingRef.current = true;
      return fetchAddresses();
    },
    enabled: !isFetchingRef.current,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
