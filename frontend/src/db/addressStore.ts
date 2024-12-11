import { create } from "zustand";
import { AddressStoreState } from "./models";

export interface AddressesStore {
  addresses: AddressStoreState[];

  getAddress: (addressId: string) => AddressStoreState | undefined;
  setAddresses: (addresses: AddressStoreState[]) => void;
  addAddress: (newAddress: AddressStoreState) => void; // New method
  patchAddress: (
    addressId: string,
    addressPartial: Partial<AddressStoreState>
  ) => void;
}

export const useAddressesStore = create<AddressesStore>((set, get) => ({
  addresses: [],
  getAddress: (addressId) => {
    return get().addresses.find((q) => q._id === addressId);
  },

  addAddress: (newAddress) => {
    set((state) => ({
      addresses: [newAddress, ...state.addresses],
    }));
  },

  patchAddress: (addressId, addressPartial) => {
    set((state) => {
      const addresses = [...state.addresses];
      const index = addresses.findIndex((q) => q._id === addressId);

      if (index !== -1) {
        addresses[index] = {
          ...addresses[index],
          ...addressPartial,
        };
      }

      return {
        ...state,
        addresses: addresses,
      };
    });
  },

  setAddresses: (addresses) => {
    set(() => ({
      addresses,
    }));
  },
}));
