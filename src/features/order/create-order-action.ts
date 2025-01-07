import { redirect } from "react-router-dom";
import { createOrder } from "../../services/api-restaurant";
import { OrderCreateForm, OrderErrors, PizzaCart } from "../../types/types";
import { isValidPhone } from "../../utils/helpers";

export async function createOrderAction({ request }: { request: Request }) {
    try {
        const data = await request.formData();
        const rawFormData = Object.fromEntries(data);
        const errors: OrderErrors = { phoneError: "" };

        const cart: PizzaCart[] = JSON.parse(rawFormData.cart.toString());
        const priority = rawFormData.priority === "on";

        const formData = {
            ...rawFormData,
            cart,
            priority,
        };
        if (!isValidPhone(rawFormData.phone.toString())) {
            errors.phoneError =
                "Invalid phone number. Please provide correct number.";
        }
        if (
            Object.values(errors).find(
                (errorMessage) => errorMessage.length !== 0
            )
        ) {
            return errors;
        }
        // console.log({ formData });
        // return null;
        const newOrder = await createOrder(formData as OrderCreateForm);

        return redirect(`/order/${newOrder.id}`);
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to create order"
        );
    }
}
