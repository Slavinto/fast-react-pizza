import { formatCurrency } from "../../utils/helpers";
import { useAppSelector } from "../../utils/hooks/use-selector";
import { getCartWithTotals } from "./cart-slice";

function CartOverview() {
    const cart = useAppSelector(getCartWithTotals);
    const totals = cart.find((item) => item.pizzaId === "totals");

    return totals ? (
        <div className='mt-auto text-stone-50 uppercase p-8 bg-gradient-to-t from-stone-900 to-transparent rounded-t-xl flex justify-between'>
            <p className='font-semibold space-x-4'>
                <span>
                    {totals.quantity === 0
                        ? ""
                        : `${totals.quantity} pizza${totals.quantity === 1 ? "" : "s"}`}
                </span>
                <span>
                    {totals.totalPrice ? formatCurrency(totals.totalPrice) : ""}
                </span>
            </p>
        </div>
    ) : null;
}

export default CartOverview;
