export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null; 
}


export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface ICart {
    items: ICartItem[];
    total: number; 
}

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


export interface ICartManager {
    items: ICartItem[];
               

    getItems(): ICartItem[];

    addItem(product: IProduct, quantity: number): void;

    removeItem(productId: string): void;

    calculateTotal(): number;

    clear(): void;
}

export interface IOrderManager {
    orders: IOrder[];                       

    createOrder(payment: string, email: string, phone: string, address: string, items: string[], total: number): IOrder;

    getOrders(): IOrder[];
}

export interface IBaseComponent {
    render(): string;                    // Метод для рендеринга HTML-разметки компонента
    update(data: any): void;             // Метод для обновления компонента с новыми данными
    show(): void;                        // Метод для отображения компонента
    hide(): void;                        // Метод для скрытия компонента
}

export interface IProductCard extends IBaseComponent {
    setTemplate(template: string): void; // Устанавливает шаблон для карточки товара
    setProduct(product: IProduct): void; // Принимает данные товара для отображения
}

export interface IPopup extends IBaseComponent {
    open(): void;                        // Открытие попапа
    close(): void;                       // Закрытие попапа
    setContent(content: string): void;   // Установка контента попапа
}

export interface IProductPopup extends IPopup {
    setProduct(product: IProduct): void; // Устанавливает данные товара в попап
}

export interface ICartPopup extends IPopup {
    setCart(cart: ICart): void;          // Устанавливает данные корзины в попап
}

export interface IButton extends IBaseComponent {
    setLabel(label: string): void;       // Устанавливает текст кнопки
    setAction(action: () => void): void; // Устанавливает действие, выполняемое при нажатии
}

export interface IOrderFormPopup extends IPopup {
    setOrderData(order: IOrder): void;      // Устанавливает данные заказа в попап
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