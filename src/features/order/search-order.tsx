import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/use-selector";
import { getCartQuantity } from "../cart/cart-slice";

const SearchOrder = () => {
    const [orderNumber, setOrderNumber] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!orderNumber) return;
        navigate(`/order/${orderNumber}`);
        setOrderNumber("");
    };
    const quantity = useAppSelector(getCartQuantity);

    return (
        <div className='flex gap-8 items-center'>
            <Link to='/cart' className='text-4xl relative'>
                {quantity ? (
                    <div className='absolute flex justify-center items-center -right-3 rounded-full w-6 h-6 z-50 bg-orange-500/90'>
                        <span className='text-sm text-white '>{quantity}</span>
                    </div>
                ) : null}
                <FaCartShopping />
            </Link>
            <form onSubmit={handleSubmit} className='shadow-md'>
                <input
                    className='shadow-md p-2 rounded-md placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-300 w-full'
                    placeholder='Search order #'
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                />
            </form>
        </div>
    );
};

export default SearchOrder;
