import { getOrder } from "../../services/api-restaurant";

export async function orderLoader(orderId?: string) {
    try {
        if (!orderId) {
            throw new Error(
                "Invalid order Id. Please provide correct order Id."
            );
        }
        const order = await getOrder(orderId);
        if (!order) {
            throw new Error("Couldn't find order with id " + orderId);
        }
        return order;
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Couldn't find order with id " + orderId
        );
    }
}
