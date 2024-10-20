export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null; 
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICardBasket{
    title:string;
    price:number;
}

export interface IContactForm {
    email: string;
    phone: string;
    valid: boolean;
    errors: string[];
}


export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
}

export interface IOrder extends IOrderForm {
    items: string[]
}

export interface IProductStore {
    products: IProduct[];
    targetItem : ICartItem;

    getAllProducts(): IProduct[];

    addProducts(newProducts: IProduct[]): void;

    deleteProducts(newProducts: IProduct[]): void;
}

export type IserverResponse = {
    id?:string,
    total?:number,
    error?:string
    
}

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
    loading: boolean;
}

export interface IOrderForm {
    address:string
    payment: string;
    email: string;
    phone: string;
}

export interface IOrder extends IOrderForm {
    items: string[]
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;