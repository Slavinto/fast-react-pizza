export enum AppStatus {
    AppDataLoaded = "app/dataLoaded",
    AppIdle = "app/idle",
}

export enum OrderStatus {
    OrderSubmitted = "order/submitted",
}

export interface Position {
    latitude: number;
    longitude: number;
}
// =========Pizza=types=================
export interface PizzaBase {
    id: number;
    name: string;
    unitPrice: number;
}

export interface PizzaExtended {
    imageUrl: string;
    ingredients: string[];
    soldOut: boolean;
}

export interface PizzaCart extends PizzaBase {
    quantity: number;
    totalPrice: number;
}

export interface PizzaApi extends PizzaBase, PizzaExtended {}

export interface PizzaItem extends PizzaCart, PizzaExtended {}

// =========Pizza=types=================

export interface Order {
    id: string;
    customer: string;
    phone: string;
    address: string;
    position: Position;
    status?: OrderStatus;
    priority: boolean;
    priorityPrice: number;
    orderPrice: number;
    estimatedDelivery: Date;
    cart: PizzaCart[];
}

// ====================State=========================

export interface State {
    status: AppStatus;
    order: Order | null;
}
// ====================State=========================
