// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { Order as IOrder, PizzaApi } from "../../types/types";
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from "../../utils/helpers";
import OrderItem from "./order-item";
import { useAppDispatch } from "../../utils/hooks/use-dispatch";
import { itemsRemove } from "../cart/cart-slice";
import { useEffect } from "react";
import CustomButton from "../../ui/custom-button";

function Order() {
    const order = useLoaderData() as IOrder;
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;
    console.log({ order });
    const deliveryIn = calcMinutesLeft(estimatedDelivery);
    const dispatch = useAppDispatch();
    const fetcher = useFetcher();

    // loading menu data for displaying in order items
    useEffect(() => {
        if (!fetcher.data && fetcher.state === "idle") {
            fetcher.load("/menu");
        }
    }, [fetcher]);
    // remove all items from the cart when new order is created
    useEffect(() => {
        if (id) dispatch(itemsRemove());
    }, [id, dispatch]);

    const handleTogglePriority = () => {
        const formData = new FormData();
        formData.append("order", JSON.stringify(order));
        fetcher.submit(formData, { method: "PATCH" });
    };

    return (
        <div className='max-w-[40rem] mx-auto card-container mt-10 p-8 flex-col gap-8 self-center text-sm sm:text-lg'>
            <div className='flex gap-2 justify-between flex-wrap'>
                <h2 className='sm:text-xl text-lg'>Order {id} status</h2>

                <div className='flex gap-2'>
                    <CustomButton
                        text='Priority'
                        onClick={handleTogglePriority}
                        classNames={`border-0 !h-full !w-full font-semibold px-2 rounded-md ${priority ? "!text-emerald-800 !bg-emerald-400" : "!text-stone-500 !bg-stone-500/30"}`}
                    />
                    <span className='px-2 rounded-md text-stone-500 bg-stone-300'>
                        {status}&nbsp;order
                    </span>
                </div>
            </div>

            <div className='flex gap justify-between flex-wrap text-stone-500 bg-stone-200 rounded-md p-2'>
                <p>
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(
                              estimatedDelivery
                          )} minutes left 😃`
                        : "Order should have arrived"}
                </p>
                <p>
                    (Estimated delivery:
                    <span className='font-semibold'>
                        {" "}
                        {formatDate(estimatedDelivery)})
                    </span>
                </p>
            </div>
            <div className='flex flex-col gap justify-between flex-wrap text-stone-500 bg-stone-200 rounded-md p-2'>
                <ul className='divide-y space-y-4 divide-stone-900/10'>
                    {cart.map((item) => (
                        <OrderItem
                            key={item.pizzaId}
                            item={{
                                ...item,
                                isLoadingIngredients:
                                    fetcher.state === "loading",
                                ingredients: fetcher?.data
                                    ? [
                                          ...fetcher.data.find(
                                              (menuPizza: PizzaApi) =>
                                                  menuPizza.id === item.pizzaId
                                          ).ingredients,
                                      ]
                                    : [],
                                addIngredients: [],
                                removeIngredients: [],
                            }}
                        />
                    ))}
                </ul>
            </div>

            <div className='flex flex-col gap justify-between flex-wrap text-stone-500 bg-stone-200 rounded-md p-2'>
                <p>
                    Price pizza:{" "}
                    <span className='font-semibold'>
                        {formatCurrency(orderPrice)}
                    </span>
                </p>
                {priority && (
                    <p>
                        Price priority:{" "}
                        <span className='font-semibold'>
                            {formatCurrency(priorityPrice)}
                        </span>
                    </p>
                )}
                <p>
                    To pay on delivery:{" "}
                    <span className='font-semibold'>
                        {formatCurrency(orderPrice + priorityPrice)}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Order;
