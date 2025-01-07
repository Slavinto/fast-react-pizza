import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/cart-overview";
import Header from "./header";
import LoadingIndicator from "./loading-indicator";
// import { store } from "../store/store";

const AppLayout = () => {
    // store.dispatch(updateName({ name: "Slava" }));
    // console.log(store.getState());
    return (
        <div className='grid grid-rows-[auto_1fr_auto] h-screenDvh container relative mx-auto'>
            <LoadingIndicator />
            <Header />
            <main className='overflow-scroll scrollbar-hide'>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    );
};

export default AppLayout;
