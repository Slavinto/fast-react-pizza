import { useLoaderData } from "react-router-dom";
import { PizzaApi } from "../../types/types";
import MenuItem from "./menu-item";

function Menu() {
    // dispatch isLoadedData false

    const menu = useLoaderData() as PizzaApi[];
    // dispatch isLoadedData true
    return (
        <ul className='bg-blue-200 '>
            {menu.map((pizza) => (
                <MenuItem key={pizza.id} pizza={pizza} />
            ))}
        </ul>
    );
}

export default Menu;
