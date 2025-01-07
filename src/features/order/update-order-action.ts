import { updateOrder } from "../../services/api-restaurant";
import { Order, OrderStatus } from "../../types/types";

export async function updateOrderAction({
    request,
    // params,
}: {
    request: Request;
    // params: URLSearchParams;
}) {
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    const order = {
        ...JSON.parse(formData.order.toString()),
    } as unknown as Order;
    // const { orderId } = params;
    if (
        !order ||
        order.priority === true ||
        order.status === OrderStatus.Delivered
    )
        return null;

    // 0RKOG5
    const updatedOrder = { ...order, priority: !order.priority };
    await updateOrder(order.id, updatedOrder);
    return null;
}
