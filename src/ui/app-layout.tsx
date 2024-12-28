import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/cart-overview";
import Header from "./header";

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className='bg-cyan-200 container mx-auto'>
            {isLoading && <div className='loader' />}

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
