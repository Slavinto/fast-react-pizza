import { Link } from "react-router-dom";
// import { fakeCart } from "../../data/cart-data";

function Cart() {
    // const cart = fakeCart;

    return (
        <div className='bg-slate-300'>
            <Link to='/menu'>&larr; Back to menu</Link>

            <h2>Your cart, %NAME%</h2>

            <div>
                <Link to='/order/new'>Order pizzas</Link>
                <button>Clear cart</button>
            </div>
        </div>
    );
}

export default Cart;
