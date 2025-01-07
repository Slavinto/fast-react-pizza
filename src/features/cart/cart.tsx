import CustomButton from "../../ui/custom-button";
import CustomLink from "../../ui/custom-link";
import CartItem from "./cart-item";
import { PizzaItem } from "../../types/types";
import { useAppSelector } from "../../utils/hooks/use-selector";
import EmptyCart from "./empty-cart";
import { useAppDispatch } from "../../utils/hooks/use-dispatch";
import { getCartWithTotals, itemsRemove } from "./cart-slice";
import { getUser } from "../user/user-slice";

function Cart() {
    const { name } = useAppSelector(getUser);
    const cart = useAppSelector(getCartWithTotals);

    const dispatch = useAppDispatch();
    // forming cart array with "totals" pizzaId to render at the cart-overview

    console.log({ cart });
    if (cart.find((item) => item.pizzaId === "totals")?.quantity === 0) {
        return (
            <div className='max-w-[40rem] mx-auto card-container mt-10 p-8 flex-col self-center text-center'>
                <EmptyCart />
            </div>
        );
    }

    function handleClearCart() {
        dispatch(itemsRemove());
    }

    return (
        <div className='max-w-[40rem] mx-auto card-container mt-10 p-8 flex-col self-center text-center'>
            <CustomLink text='&larr; Back to menu' path='/menu' />
            <h2 className='text-2xl font-semibold'>Your cart, {name}</h2>

            <div className='flex flex-col gap-8 items-center'>
                <ul className='cart my-10 flex flex-col border-b-2'>
                    {cart.map((item) => (
                        <CartItem key={item.pizzaId} item={item as PizzaItem} />
                    ))}
                </ul>

                <div className='flex space-x-8 items-center'>
                    <CustomButton path='/order/new' text='Order pizzas' />
                    <CustomButton
                        text='Clear cart'
                        type='clear-cart'
                        onClick={handleClearCart}
                    />
                </div>
            </div>
        </div>
    );
}

export default Cart;
