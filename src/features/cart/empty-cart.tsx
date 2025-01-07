import CustomLink from "../../ui/custom-link";

function EmptyCart() {
    return (
        <div className='flex flex-col gap-4 text-xl'>
            <CustomLink path='/menu' text='&larr; Back to menu' />

            <p className='font-bold'>
                Your cart is still empty. <br />
                Start adding some pizzas 😋
            </p>
        </div>
    );
}

export default EmptyCart;
