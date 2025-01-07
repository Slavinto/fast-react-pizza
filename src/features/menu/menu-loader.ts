import { getMenu } from "../../services/api-restaurant";

export async function menuLoader() {
    const menu = await getMenu();

    return menu;
}
