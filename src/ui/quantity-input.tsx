import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import CustomButton from "./custom-button";
import CustomInputField from "./custom-input-field";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../utils/hooks/use-dispatch";
import { PizzaCart } from "../types/types";
import {
    itemUpdateQuantity,
    makeGetCartItemById,
} from "../features/cart/cart-slice";
import { useAppSelector } from "../utils/hooks/use-selector";

const QuantityInput = ({ pizzaItem }: { pizzaItem: PizzaCart }) => {
    const getCartItemById = makeGetCartItemById(+pizzaItem.pizzaId);
    const initQuantity = useAppSelector(getCartItemById);

    // actual pizza quantity from the cart state

    const [quantity, setQuantity] = useState(initQuantity);
    const dispatch = useAppDispatch();

    const updQty = (operation: "inc" | "dec" | number) => {
        if (operation === "inc") {
            setQuantity((prev) => prev + 1);
        } else if (operation === "dec") {
            setQuantity((prev) => (prev < 1 ? 0 : prev - 1));
        } else {
            setQuantity(operation);
        }

        dispatch(
            itemUpdateQuantity({
                ...pizzaItem,
                quantity:
                    operation === "inc"
                        ? quantity + 1
                        : operation === "dec"
                          ? quantity - 1
                          : operation,
            })
        );
    };

    useEffect(() => {
        if (initQuantity !== quantity) {
            setQuantity(initQuantity);
        }
    }, [quantity, initQuantity]);

    return (
        <div className='flex gap-4 items-center mt-auto'>
            <CustomButton
                text=''
                icon={<CiSquareMinus />}
                classNames='text-5xl'
                onClick={() => updQty("dec")}
            />
            <CustomInputField
                isControlled={true}
                defaultValue={quantity.toString()}
                onChange={(e) => updQty(+e.target.value)}
                label=''
                name='quantity-field'
                type='number'
                classNames='text-center text-xl'
            />
            <CustomButton
                text=''
                icon={<CiSquarePlus />}
                classNames='text-5xl'
                onClick={() => updQty("inc")}
            />
        </div>
    );
};

export default QuantityInput;
