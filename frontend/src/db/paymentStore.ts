import { create } from "zustand";

type CurrentRange = "free" | "paid";

interface PaymentModel {
  price: number;
  value: string;
  currentRange: CurrentRange;
  updatePrice: (value: string) => void;
  setCurrentRange: (range: CurrentRange) => void;
}

export const MAX_VALUE = 4;
export const MIN_VALUE = 2;

const calculatePrice = (value: string) => {
  return value.length > MIN_VALUE ? (value.length - MIN_VALUE) * 10 : 0;
};

export const usePaymentStore = create<PaymentModel>((set) => ({
  price: 0,
  value: "",
  currentRange: "free",
  updatePrice: (value: string) => {
    const newPrice = calculatePrice(value);
    set({ price: newPrice, value: value });
  },
  setCurrentRange: (range: CurrentRange) => {
    set({ currentRange: range });
  },
}));
