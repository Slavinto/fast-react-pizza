import { Order } from "../types/types";

export const order: Order = {
    id: "ABCDEF",
    customer: "Jonas",
    phone: "123456789",
    address: "Arroios, Lisbon , Portugal",
    priority: true,
    estimatedDelivery: new Date("2027-04-25T10:00:00"),
    cart: [
        {
            pizzaId: 7,
            name: "Napoli",
            quantity: 3,
            unitPrice: 16,
            totalPrice: 48,
        },
        {
            pizzaId: 5,
            name: "Diavola",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
        {
            pizzaId: 3,
            name: "Romana",
            quantity: 1,
            unitPrice: 15,
            totalPrice: 15,
        },
    ],
    position: { latitude: -9.0, longitude: 38.0 },
    orderPrice: 95,
    priorityPrice: 19,
};
