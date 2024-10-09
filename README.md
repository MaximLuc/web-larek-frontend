# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


Этот проект основан на событийно-ориентированной архитектуре и использует подход **MVP** (Model-View-Presenter). В данном подходе:

- **Model** отвечает за логику данных и бизнес-логику.
- **View** отображает данные и предоставляет интерфейс для взаимодействия пользователя с приложением.
- **Presenter** (в данном случае через событие) управляет логикой между Model и View, реагируя на действия пользователя и события, связанные с изменением данных.

## 1. Описание данных

### Интерфейсы данных

#### `IProduct` – интерфейс для описания товара
Этот интерфейс используется для хранения информации о товарах, таких как описание, изображение, цена, категория и идентификатор.

```typescript
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
```


#### `ICartItem` – элемент корзины
Отвечает за товар и его количество.

```typescript
interface ICartItem {
    product: IProduct;
    quantity: number;
}
```



#### `IOrder` – заказ
Описывает данные, необходимые для оформления заказа.
```typescript

interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}
```

## 2. Модели данных

#### `IProductStore`
Этот интерфейс управляет товарами.
```typescript
interface IProductStore {
    products: IProduct[];// все товары 
    targetItem: ICartItem; // выбранный товар(карточка) 

    getAllProducts(): IProduct[]; // заполнить массив товарами
    addProducts(newProducts: IProduct[]): void;// добавить новый товар 
    deleteProducts(newProducts: IProduct[]): void;// удалить товар 
}
```


#### `ICartManager`
Этот интерфейс управляет корзиной.
```typescript
interface ICartManager {
    items: ICartItem[];// товары в корзине 

    getItems(): ICartItem[];// взять товар из корзины 
    addItem(product: IProduct, quantity: number): void;// добавить товар в корзину 
    removeItem(productId: string): void;// удалить товар 
    calculateTotal(): number;// посчитать общую сумму 
    clear(): void;// очистить корзину 
}
```


#### `IOrderManager`
Этот интерфейс управляет заказами.
```typescript
interface IOrderManager {
    orders: IOrder[];//хранит все заказы 

    createOrder(payment: string, email: string, phone: string, address: string, items: string[], total: number): IOrder;//создать заказ 
    getOrders(): IOrder[];// получить заказ 
}
```

## 2. Компоненты представления

#### `IBaseComponent`
Базовый интерфейс для всех компонентов.
```typescript
interface IBaseComponent {
    render(): string;// отрисовка компонента 
    update(data: any): void;// обновление компонента 
    show(): void;// показать компонент 
    hide(): void;// скрыть компонент 
}
```


#### `IProductCard`
Отображает карточку товара.
```typescript
interface IProductCard extends IBaseComponent {
    setTemplate(template: string): void;// устанавливает нужный template
    setProduct(product: IProduct): void; // устанавливает выбранный товар 
}
```


#### `IProductPopup`
Отображает попап с подробной информацией о товаре.
```typescript
interface IProductPopup extends IPopup {
    setProduct(product: IProduct): void;// устанавливает выбранный товар 
}
```

#### `ICartPopup`
Отображает содержимое корзины.
```typescript
interface ICartPopup extends IPopup {
    setCart(cart: ICart): void;//показывает содержимое корзины
}
```

#### `IOrderFormPopup`
Попап с формой для ввода данных заказа.
```typescript
interface IOrderFormPopup extends IPopup {
    setOrderData(order: IOrder): void;
}
```

## Описание событий

В данном проекте используется событийно-ориентированный подход для связывания работы с данными и элементов интерфейса. Ниже описаны события, которые генерируются при изменении данных или взаимодействии пользователя с интерфейсом, а также действия, которые выполняются при возникновении этих событий.

### События, связанные с изменением данных

1. **`products:changed`**
   - **Описание:** Происходит, когда изменяется список товаров (например, при добавлении или удалении товара).
   - **Действия:**
     - Перерисовать блок с карточками товаров.
     - Обновить каталог товаров.
   - **Генерируется:** При вызове методов `addProducts()` или `deleteProducts()` в `IProductStore`.

2. **`cart:changed`**
   - **Описание:** Генерируется при изменении содержимого корзины (например, при добавлении или удалении товара).
   - **Действия:**
     - Обновить отображение корзины (например, иконку корзины с количеством товаров).
     - Обновить содержимое попапа корзины, если он открыт.
   - **Генерируется:** При вызове методов `addItem()` или `removeItem()` в `ICartManager`.

3. **`targetItem:changed`**
   - **Описание:** Событие возникает, когда пользователь выбирает товар (например, кликает на карточку товара).
   - **Действия:**
     - Открыть попап с подробной информацией о выбранном товаре.
     - Обновить отображение выбранного товара.
   - **Генерируется:** При изменении свойства `targetItem` в `IProductStore`.

4. **`order:created`**
   - **Описание:** Событие генерируется после успешного создания нового заказа.
   - **Действия:**
     - Показать уведомление о успешном заказе.
     - Очистить корзину.
     - Обновить отображение корзины.
   - **Генерируется:** При вызове метода `createOrder()` в `IOrderManager`.

### События, связанные с действиями пользователя

1. **`card:select`**
   - **Описание:** Происходит, когда пользователь кликает на карточку товара.
   - **Действия:**
     - Сохранить выбранный товар в свойство `targetItem` модели `IProductStore`.
     - Сгенерировать событие `targetItem:changed`.
   - **Генерируется:** При клике на карточку товара.

2. **`popup:cart:open`**
   - **Описание:** Происходит, когда пользователь открывает попап корзины.
   - **Действия:**
     - Открыть попап с содержимым корзины.
     - Показать товары, добавленные в корзину.
   - **Генерируется:** При клике на иконку корзины.

3. **`popup:order:open`**
   - **Описание:** Событие возникает, когда пользователь нажимает кнопку оформления заказа.
   - **Действия:**
     - Открыть попап с формой для ввода данных (почта, телефон, адрес).
   - **Генерируется:** При нажатии кнопки "Оформить заказ".

4. **`popup:order:submit`**
   - **Описание:** Происходит при отправке формы с данными заказа.
   - **Действия:**
     - Передать данные заказа в модель `IOrderManager` для создания нового заказа.
     - Сгенерировать событие `order:created` при успешном оформлении.
   - **Генерируется:** При отправке формы заказа.


### Эмиттер событий
Для обработки событий используется эмиттер. Он позволяет слушать события и реагировать на них.

