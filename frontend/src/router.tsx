import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import { HomePage } from "./pages/home/page";
import { AddressPage } from "./pages/address/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/address/:addressId", element: <AddressPage /> },
    ],
  },
]);
