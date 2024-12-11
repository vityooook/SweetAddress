import { config } from "~/config";
import { useAuthStore } from "~/db/authStore";
import { AddressStoreState } from "~/db/models";
import { OrderFormData } from "~/pages/home/zod";

const waitForAccessToken = async () => {
  const store = useAuthStore.getState();
  let attempts = 0;
  const maxAttempts = 10;

  return new Promise((resolve, reject) => {
    const checkAccessToken = () => {
      attempts += 1;
      const { accessToken } = store;

      if (accessToken) {
        resolve(accessToken);
      } else if (attempts >= maxAttempts) {
        reject(new Error("Access token not available after 10 attempts"));
      } else {
        setTimeout(checkAccessToken, 10);
      }
    };
    checkAccessToken();
  });
};

export const createOrder = async (orderData: OrderFormData) => {
  try {
    const accessToken = await waitForAccessToken();
    const response = await fetch(`${config.apiUrl}/api/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
};

export const checkOrder = async (orderId: number) => {
  try {
    const accessToken = await waitForAccessToken();
    const response = await fetch(
      `${config.apiUrl}/api/orders/check/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in check Order:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId: number) => {
  try {
    const accessToken = await waitForAccessToken();
    const response = await fetch(
      `${config.apiUrl}/api/orders/delete/${orderId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in delete Order:", error);
    throw error;
  }
};

export const fetchAddresses = async (): Promise<AddressStoreState[]> => {
  try {
    const accessToken = await waitForAccessToken();
    const response = await fetch(`${config.apiUrl}/api/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in fetchCollections:", error);
    throw error;
  }
};

export const fetchAddress = async (
  addressId: string
): Promise<AddressStoreState> => {
  try {
    const accessToken = await waitForAccessToken();
    const response = await fetch(`${config.apiUrl}/api/orders/${addressId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in fetchCollections:", error);
    throw error;
  }
};
