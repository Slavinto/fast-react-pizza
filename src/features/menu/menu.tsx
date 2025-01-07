import { useLoaderData } from "react-router-dom";
import { PizzaApi } from "../../types/types";
import MenuItem from "./menu-item";
// import { store } from "../../store/store";

function Menu() {
    const menu = useLoaderData() as PizzaApi[];
    // console.log(store.getState());
    // console.log({ menu });
    return (
        <ul className='bg-orange-300/10 w-full flex flex-nowrap flex-col sm:flex-row sm:flex-wrap py-8 px-16 gap-y-12 rounded-xl'>
            {menu.map((pizza, idx) => (
                <MenuItem key={pizza.id || idx} pizza={pizza} />
            ))}
        </ul>
    );
}

export default Menu;
