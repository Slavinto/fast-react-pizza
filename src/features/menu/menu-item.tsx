import { PizzaApi } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }: { pizza: PizzaApi }) {
    const {
        // id,
        name,
        unitPrice,
        ingredients,
        soldOut,
        imageUrl,
    } = pizza;

    return (
        <li className='font-sans'>
            <img src={imageUrl} alt={name} />
            <div>
                <p>{name}</p>
                <p>{ingredients.join(", ")}</p>
                <div>
                    {!soldOut ? (
                        <p>{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p>Sold out</p>
                    )}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
