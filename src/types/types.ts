export enum AppStatus {
    AppDataLoaded = "app/dataLoaded",
    AppIdle = "app/idle",
}

export enum OrderStatus {
    Delivered = "delivered",
}

export interface Position {
    latitude: number;
    longitude: number;
}
// =========Pizza=types=================
export interface PizzaBase {
    pizzaId: number | "totals";
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

export interface PizzaOrder
    extends PizzaCart,
        Pick<PizzaExtended, "ingredients"> {
    addIngredients: string[];
    removeIngredients: string[];
    isLoadingIngredients: boolean;
}

export interface PizzaApi extends Omit<PizzaBase, "pizzaId">, PizzaExtended {
    id: number;
}

export interface PizzaItem extends PizzaCart, PizzaExtended {}

// =========Pizza=types=================

// =========Order=types=================
export interface OrderCreateForm {
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    cart: PizzaCart[];
}

export interface Order extends OrderCreateForm {
    id: string;
    position: Position;
    status?: OrderStatus;
    priorityPrice: number;
    orderPrice: number;
    estimatedDelivery: Date;
}

export interface OrderErrors {
    phoneError?: string;
}
// =========Order=types=================
// =========Actions=============================
// =========User=============================
export enum UserActionTypes {
    UserNameUpdated = "user/nameUpdated",
    UserOrderedPizza = "user/orderedPizza",
    UserFetchedAddress = "user/fetchedAddress",
    // UserFetchedAddressSuccess = "user/fetchedAddressSuccess",
}

export enum UserStatus {
    Idle = "idle",
    Loading = "loading",
    Error = "error",
}

export interface ActionUserUpdatedName {
    type: UserActionTypes.UserNameUpdated;
    payload: { name: string };
}

export interface ActionUserFetchedAddress {
    type: UserActionTypes.UserFetchedAddress;
    payload: { position: Position; address: string };
}

export interface ActionUserOrderedPizza {
    type: UserActionTypes.UserOrderedPizza;
    payload: {
        name: string;
        phoneNumber: string;
        address: string;
        position: Position;
        id: string;
    };
}

export type UserActions = ActionUserUpdatedName | ActionUserOrderedPizza;
// =========User=============================
// =========Cart=============================
export enum CartActionTypes {
    CartItemsRemoved = "cart/itemsRemoved",
    CartItemsQuantityUpdated = "cart/itemsQuantityUpdated",
}

export interface ActionCartItemsRemoved {
    type: CartActionTypes.CartItemsRemoved;
    payload?: { pizzaId: number };
}

export interface ActionCartItemsQuantityUpdated {
    type: CartActionTypes.CartItemsQuantityUpdated;
    payload: PizzaCart;
}

export type CartActions =
    | ActionCartItemsRemoved
    | ActionCartItemsQuantityUpdated;
// =========Cart=============================
// =========Actions=============================
// ====================State=========================
export interface UserState {
    id: string | "";
    name: string | "";
    phoneNumber: string | "";
    address: string | "";
    position: Position | null;
    status: UserStatus;
    error: string | undefined;
}

export interface CartState {
    cart: PizzaCart[];
}

export interface State {
    status: AppStatus;
    order: Order | null;
}
// ====================State=========================
