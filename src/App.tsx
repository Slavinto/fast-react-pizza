import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/home";
import Menu from "./features/menu/menu";
import { menuLoader } from "./features/menu/menu-loader";
import Cart from "./features/cart/cart";
import CreateOrder from "./features/order/create-order";
import Order from "./features/order/order";
import AppLayout from "./ui/app-layout";
import CustomError from "./ui/custom-error";
import { orderLoader } from "./features/order/order-loader";
import { createOrderAction } from "./features/order/create-order-action";
import ProtectedRoute from "./ui/protected-route";
import { updateOrderAction } from "./features/order/update-order-action";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <CustomError />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <CustomError />,
            },
            {
                path: "/menu",
                loader: menuLoader,
                element: (
                    <ProtectedRoute>
                        <Menu />
                    </ProtectedRoute>
                ),
                errorElement: <CustomError />,
            },
            {
                path: "/cart",
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                ),
                errorElement: <CustomError />,
            },
            {
                path: "/order/new",
                element: (
                    <ProtectedRoute>
                        <CreateOrder />
                    </ProtectedRoute>
                ),
                action: createOrderAction,
                errorElement: <CustomError />,
            },
            {
                path: "/order/:orderId",
                loader: ({ params: { orderId } }) => orderLoader(orderId),
                action: updateOrderAction,
                element: (
                    <ProtectedRoute>
                        <Order />
                    </ProtectedRoute>
                ),
                errorElement: <CustomError />,
            },
            {
                path: "*",
                loader: () => {
                    throw new Response("Page not found", {
                        status: 404,
                        statusText: "Page not found",
                    });
                },
                element: <CustomError />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
