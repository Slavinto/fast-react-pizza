import { PizzaOrder } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item }: { item: PizzaOrder }) {
    const { quantity, name, totalPrice, ingredients, isLoadingIngredients } =
        item;

    return (
        <li className='p-0 rounded-none flex'>
            <div className='flex flex-col gap-2'>
                <p className='font-semibold flex gap-2'>
                    <span className=''>{quantity}&times;</span>{" "}
                    <span>{name}</span>
                </p>
                <p className='text-sm capitalize italic text-stone-500 ml-auto grow '>
                    {isLoadingIngredients
                        ? "Loading..."
                        : ingredients.join(", ")}
                </p>
            </div>
            <p className='ml-auto font-semibold'>
                {formatCurrency(totalPrice)}
            </p>
        </li>
    );
}

export default OrderItem;
