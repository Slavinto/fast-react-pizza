// import { isValidPhone } from "../../utils/helpers";

import {
    Form,
    useActionData,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import CustomButton from "../../ui/custom-button";
import LoadingIndicator from "../../ui/loading-indicator";
import { OrderErrors, UserStatus } from "../../types/types";
import { useState } from "react";
import CustomInputField from "../../ui/custom-input-field";
import { useAppSelector } from "../../utils/hooks/use-selector";
import { getUser } from "../user/user-slice";
import { getCart } from "../cart/cart-slice";
import AddressInput from "../../ui/address-input";

// https://uibakery.io/regex-library/phone-number

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);
    const navigation = useNavigation();
    const { name, status, position } = useAppSelector(getUser);
    const cart = useAppSelector(getCart);
    const submit = useSubmit();
    const orderErrors = useActionData() as OrderErrors;
    const [errorKey, setErrorKey] = useState(0);
    const isSubmitting = navigation.state === "submitting";

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorKey((prev) => prev + 1);
        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);
        submit(formData, { method: "POST", action: "/order/new" });
    }

    return (
        <div className='max-w-[40rem] mx-auto card-container mt-10 p-8 flex-col self-center text-center'>
            <h2 className='sm:text-xl text-lg'>Ready to order? Let's go!</h2>

            <Form
                onSubmit={handleFormSubmit}
                className='md:flex-row flex-col flex gap-8 mt-6 text-md sm:text-lg items-center'
            >
                <div className='flex flex-col gap-4 md:w-1/2 md:px-0 px-8 w-full'>
                    <CustomInputField
                        name='customer'
                        label='First Name'
                        defaultValue={name}
                    />
                    <CustomInputField
                        name='phone'
                        label='Phone number'
                        type='tel'
                        error={orderErrors?.phoneError}
                        key={errorKey}
                    />
                    <AddressInput />
                </div>
                <div className='flex flex-col gap-4 md:w-1/2 md:px-0 px-8 w-full'>
                    <div className='flex gap-1 text-sm'>
                        <input
                            className='checkbox'
                            type='checkbox'
                            name='priority'
                            id='priority'
                            checked={withPriority}
                            onChange={(e) => setWithPriority(e.target.checked)}
                        />
                        <label htmlFor='priority'>
                            Want to give your order priority?
                        </label>
                    </div>

                    <input
                        type='hidden'
                        name='cart'
                        value={JSON.stringify(cart)}
                    />
                    {position && (
                        <input
                            type='hidden'
                            name='position'
                            value={`${position.latitude}, ${position.longitude}`}
                        />
                    )}
                    {isSubmitting ? (
                        <div className=''>
                            <LoadingIndicator />
                        </div>
                    ) : (
                        <CustomButton
                            icon=''
                            type='submit'
                            disabled={status === UserStatus.Loading}
                            text='Order Now'
                            classNames=''
                        />
                    )}
                </div>
            </Form>
        </div>
    );
}

export default CreateOrder;
