import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/cart-overview";
import Header from "./header";

const AppLayout = () => {
    return (
        <div className='bg-cyan-200 container mx-auto'>
            <Header />
            <main>
                <h1>Content</h1>
            </main>
            <Outlet />
            <CartOverview />
        </div>
    );
};

export default AppLayout;
