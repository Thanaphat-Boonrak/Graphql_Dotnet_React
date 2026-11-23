import { createBrowserRouter } from "react-router";
import { CustomerDashBorad } from "../features/customers/dashboard/CustomerDashBorad";
import { App } from "../layout/App";
import { HomePage } from "../features/home/HomePage";
import { OrderDashBoard } from "../features/orders/dashboard/OrderDashBoard";
import CustomerPage from "../features/customers/details/CustomerPage";
import OrderPage from "../features/orders/details/OrderPage";
import CustomerCreate from "../features/customers/dashboard/CustomerCreate";
import OrderCreate from "../features/orders/dashboard/OrderCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "customers",
        element: <CustomerDashBorad />,
      },
      {
        path: "customers/:id",
        element: <CustomerPage />,
      },
    {
        path: "customers/create",
        element: <CustomerCreate />,
      },
      {
        path: "customers/:customerId/new/order",
        element: <OrderCreate />,
      },
      {
        path: "orders",
        element: <OrderDashBoard />,
      },
      {
        path: "orders/:id",
        element: <OrderPage />,
      },
    ],
  },
]);
