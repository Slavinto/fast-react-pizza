import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/api-restaurant";
import { PizzaApi } from "../../types/types";
import MenuItem from "./menu-item";

export async function loader() {
    const menu = await getMenu();

    return menu;
}

function Menu() {
    const menu = useLoaderData() as PizzaApi[];
    return (
        <ul className='bg-blue-200 '>
            {menu.map((pizza) => (
                <MenuItem key={pizza.id} pizza={pizza} />
            ))}
        </ul>
    );
}

export default Menu;
