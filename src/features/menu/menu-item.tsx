import { PizzaApi, PizzaCart } from "../../types/types";
import QuantityInput from "../../ui/quantity-input";
import QuantitySticker from "../../ui/quantity-sticker";
import { formatCurrency } from "../../utils/helpers";
import { useAppDispatch } from "../../utils/hooks/use-dispatch";
import { useAppSelector } from "../../utils/hooks/use-selector";
import { getCart, itemsRemove } from "../cart/cart-slice";

function MenuItem({ pizza }: { pizza: PizzaApi }) {
    const cart = useAppSelector(getCart);
    const dispatch = useAppDispatch();
    const {
        id: pizzaId,
        name,
        unitPrice,
        ingredients,
        soldOut,
        imageUrl,
    } = pizza;

    const currentPizza = cart.find((pizza) => pizza.pizzaId === pizzaId);
    const isPizzaInCart = currentPizza && currentPizza.quantity;
    // forming PizzaCart object
    const pizzaCart: PizzaCart = {
        pizzaId,
        name,
        unitPrice,
        quantity: currentPizza ? currentPizza.quantity : 0,
        totalPrice: currentPizza
            ? currentPizza.quantity * currentPizza.unitPrice
            : unitPrice,
    };

    // const handleAddToCart = () => dispatch(itemUpdateQuantity(pizzaCart));
    const handleRemoveFromCart = () => dispatch(itemsRemove({ pizzaId }));

    return (
        <li
            className={`relative mx-auto w-[16rem] sm:w-[35rem] card-container sm:p-4 p-2 sm:flex-row sm:items-start items-center flex-col gap-2 sm:gap-8 ${soldOut ? "grayscale opacity-70" : ""} ${isPizzaInCart ? "!shadow-xl" : ""}`}
        >
            {isPizzaInCart ? (
                <QuantitySticker
                    text={currentPizza.quantity}
                    handler={handleRemoveFromCart}
                />
            ) : null}{" "}
            <div
                style={{ backgroundImage: `url(${imageUrl})` }}
                className={
                    "bg-cover bg-center h-56 w-full rounded-xl shadow-md border-custom-01 "
                }
            />
            <div className='flex flex-col gap-2 h-full text-sm sm:text-lg self-start sm:w-1/2 md:w-[85%]'>
                <p className='text-lg sm:text-3xl font-bold'>{name}</p>
                <p className='capitalize'>{ingredients.join(", ")}</p>
                <div className=''>
                    {!soldOut ? (
                        <p>{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p>Sold out</p>
                    )}
                </div>
                {soldOut ? null : <QuantityInput pizzaItem={pizzaCart} />}
            </div>
        </li>
    );
}

export default MenuItem;
