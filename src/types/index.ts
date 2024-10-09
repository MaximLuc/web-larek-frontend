interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null; 
}


interface ICartItem {
    product: IProduct;
    quantity: number;
}

interface ICart {
    items: ICartItem[];
    total: number; 
}

interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[]; 
}

interface IProductStore {
    products: IProduct[];
    targetItem : ICartItem;                         

    getAllProducts(): IProduct[];

    addProducts(newProducts: IProduct[]): void;

    deleteProducts(newProducts: IProduct[]): void;
}


interface ICartManager {
    items: ICartItem[];
               

    getItems(): ICartItem[];

    addItem(product: IProduct, quantity: number): void;

    removeItem(productId: string): void;

    calculateTotal(): number;

    clear(): void;
}

interface IOrderManager {
    orders: IOrder[];                       

    createOrder(payment: string, email: string, phone: string, address: string, items: string[], total: number): IOrder;

    getOrders(): IOrder[];
}

interface IBaseComponent {
    render(): string;                    // Метод для рендеринга HTML-разметки компонента
    update(data: any): void;             // Метод для обновления компонента с новыми данными
    show(): void;                        // Метод для отображения компонента
    hide(): void;                        // Метод для скрытия компонента
}

interface IProductCard extends IBaseComponent {
    setTemplate(template: string): void; // Устанавливает шаблон для карточки товара
    setProduct(product: IProduct): void; // Принимает данные товара для отображения
}

interface IPopup extends IBaseComponent {
    open(): void;                        // Открытие попапа
    close(): void;                       // Закрытие попапа
    setContent(content: string): void;   // Установка контента попапа
}

interface IProductPopup extends IPopup {
    setProduct(product: IProduct): void; // Устанавливает данные товара в попап
}

interface ICartPopup extends IPopup {
    setCart(cart: ICart): void;          // Устанавливает данные корзины в попап
}

interface IButton extends IBaseComponent {
    setLabel(label: string): void;       // Устанавливает текст кнопки
    setAction(action: () => void): void; // Устанавливает действие, выполняемое при нажатии
}

interface IOrderFormPopup extends IPopup {
    setOrderData(order: IOrder): void;      // Устанавливает данные заказа в попап
}