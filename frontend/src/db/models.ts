import { User } from "@telegram-apps/sdk-react";

export type UserModel = User & {
  _id?: string;
  isOnboarded: boolean;
};

export type AddressStoreState = {
  _id: string;
  status: string;
  suffix: string;
  paymentMethod: string;
  paymentStatus: string;
  ownerId: string;
  queryId: string;
  nanoAmount: number;
  masterAddress: string;
  createdAt: string;
  updatedAt: string;
  address?: string;
};
