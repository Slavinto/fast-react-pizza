import { PizzaItem } from "../../types/types";
import CustomButton from "../../ui/custom-button";
import { formatCurrency } from "../../utils/helpers";
import { CiSquareMinus } from "react-icons/ci";
import { useAppDispatch } from "../../utils/hooks/use-dispatch";
import { itemsRemove } from "./cart-slice";

function CartItem({ item }: { item: PizzaItem }) {
    const { pizzaId, name, quantity, totalPrice } = item;
    const dispatch = useAppDispatch();
    return (
        <li
            className={`text-xl flex py-2 px-4 ${pizzaId === "totals" ? "border-t-2 capitalize" : ""}`}
        >
            <p className=''>{quantity}&times;</p>
            <p className='font-semibold max-w-56 text-start'>{name}</p>
            <div className='ml-auto flex gap-2'>
                <p>{formatCurrency(totalPrice)}</p>
                {pizzaId !== "totals" && (
                    <CustomButton
                        text=''
                        icon={<CiSquareMinus />}
                        classNames='text-3xl'
                        onClick={() => dispatch(itemsRemove({ pizzaId }))}
                    />
                )}
            </div>
        </li>
    );
}

export default CartItem;
