import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/home";
import Menu from "./features/menu/menu";
import { menuLoader } from "./features/menu/menuLoader";
import Cart from "./features/cart/cart";
import CreateOrder from "./features/order/create-order";
import Order from "./features/order/order";
import AppLayout from "./ui/app-layout";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/menu",
                loader: menuLoader,
                element: <Menu />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/order/new",
                element: <CreateOrder />,
            },
            {
                path: "/order/:orderId",
                element: <Order />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
