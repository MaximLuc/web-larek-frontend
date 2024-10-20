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




Этот проект основан на **событийно-ориентированной** архитектуре и использует модульный подход к разработке компонентов. Приложение организовано с использованием отдельных сущностей для управления данными, компонентами интерфейса и событиями, что позволяет легко масштабировать и поддерживать проект.





## Основные элементы архитектуры:

- **API** — взаимодействие с серверной частью для получения и отправки данных.
- **Модели данных** — хранение и управление данными товаров, корзины, заказов и состояний.
- **Компоненты** — отображение данных и реализация интерактивных элементов.
- **События** — асинхронная связь между компонентами и данными через событийный эмиттер.






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


#### `IBasketView` – элемент корзины
Отвечает за отображение товаров в корзине и их управление.

```typescript
interface IBasketView {
    items: HTMLElement[]; // Элементы товаров в корзине
    total: number; // Общая сумма товаров
    selected: string[]; // Выбранные товары
}
```

#### `ICardActions` –  действия с карточкой товара
Интерфейс описывает действия, которые можно выполнять с карточкой товара.
```typescript

interface ICardActions {
    onClick: (event: MouseEvent) => void; // Обработчик клика
}
```

#### `ICardBasket` –  элементы корзины
Интерфейс описывает товары, добавленные в корзину.
```typescript

interface ICardBasket {
    title: string;
    price: number;
}
```

#### `IContactForm` –  форма для ввода контактных данных
Используется для ввода контактной информации пользователя при оформлении заказа.
```typescript

interface IContactForm {
    email: string;
    phone: string;
    valid: boolean; // Статус валидности формы
    errors: string[]; // Ошибки валидации
}
```

#### `IPage` –   данные страницы
Интерфейс описывает состояние страницы.
```typescript

interface IPage {
    counter: number; // Счетчик элементов
    catalog: HTMLElement[]; // Каталог товаров
    locked: boolean; // Состояние блокировки страницы
}
```

#### `IFormState` –  состояние формы
Используется для отслеживания состояния формы и ошибок валидации.
```typescript

interface IFormState {
    valid: boolean; 
    errors: string[];
}
```

#### `ApiListResponse<Type>` –   ответ от сервера
Тип, описывающий ответ сервера на запрос данных.
```typescript

type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};
```


#### `IOrderForm` –  Содержит информацию, необходимую для создания заказа.
Тип, описывающий ответ сервера на запрос данных.
```typescript

interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
}
```


#### `IOrder` –  заказ
Интерфейс описывает полный заказ, включающий данные из формы и список товаров.
```typescript

interface IOrder extends IOrderForm {
    items: string[];
}
```


#### `IserverResponse` –  Интерфейс описывает структуру ответа сервера.
Интерфейс описывает полный заказ, включающий данные из формы и список товаров.
```typescript

type IserverResponse = {
    id?: string;
    total?: number;
    error?: string;
}
```


#### `IAppState` –   состояние приложения
Содержит данные, необходимые для работы и отображения интерфейса.
```typescript

interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
    loading: boolean;
}
```


#### `FormErrors` – ошибки формы
Тип, описывающий возможные ошибки в полях формы заказа.
```typescript

type FormErrors = Partial<Record<keyof IOrder, string>>;
```



## 2. Компоненты

#### `AuctionAPI` -Класс для взаимодействия с API
Этот компонент отвечает за связь с серверной частью приложения, отправляя запросы и обрабатывая ответы. Основные функции:

- Получение списка товаров.
- Отправка заказа на сервер.

##### Основные методы:

 - `getProductList()`: Запрашивает список товаров с сервера и возвращает их для отображения в каталоге.
 - `postOrder(order: IOrder)`: Отправляет данные заказа на сервер и возвращает результат выполнения.

Пример использования:
```typescript
const api = new AuctionAPI(CDN_URL, API_URL);
api.getProductList().then(appData.setCatalog.bind(appData)).catch(console.error);
```



#### `Page` -Управление страницей приложения

Этот компонент отвечает за управление элементами интерфейса страницы, такие как каталог товаров и модальные окна. Также отслеживает состояние страницы (например, блокировка во время открытия модального окна).


Пример использования:
```typescript
const page = new Page(document.body, events);
page.locked = true; // Блокирует действия на странице
```

#### `Modal` -Модальное окно

Компонент для отображения модальных окон с различным контентом (корзина, предпросмотр товара, форма заказа и т. д.). Управляет открытием и закрытием окон.

##### Основные методы:

 - `render(content: HTMLElement)`: Отображает модальное окно с переданным содержимым.
 - `close()`: Закрывает модальное окно.


Пример использования:
```typescript
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
modal.render({ content: contacts.render({ email: '', phone: '', valid: false, errors: [] }) });
```



#### `Basket` -Корзина товаров

Отвечает за отображение и управление корзиной, отображая список добавленных товаров и их общую стоимость.

Пример использования:
```typescript
const basket = new Basket(cloneTemplate(basketTemplate), events);
basket.render({ items: appData.basket.map(item => item.getContainer()), total: appData.getTotal() });
```

#### `Order` -Компонент для управления заказами

Этот компонент отображает форму заказа и обрабатывает введенные пользователем данные, такие как адрес и способ оплаты.

Пример использования:
```typescript
const order = new Order(cloneTemplate(orderTemplate), events);
order.render({ address: '', valid: false, errors: [] });
```

#### `Contacts` - Форма контактных данных

Компонент для ввода контактной информации пользователя при оформлении заказа (например, электронная почта и телефон). Валидирует введенные данные и передает их дальше в процессе оформления заказа.

Пример использования:
```typescript
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
contacts.render({ email: '', phone: '', valid: false, errors: [] });
```

#### `OrderBuilder` - Сборка заказа

Компонент, который собирает всю информацию о заказе, включая товары, адрес, способ оплаты и контактные данные. Готовый заказ отправляется на сервер с помощью `AuctionAPI`.
##### Методы:
`setPayment(payment: string)`: Устанавливает способ оплаты.
`setAddress(address: string)`: Устанавливает адрес доставки.
`setItems(items: string[])`: Устанавливает товары для заказа.
`build()`: Формирует итоговый объект заказа.


#### `Success` -  Компонент успешного оформления заказа

Отображает сообщение об успешном оформлении заказа и предоставляет возможность закрыть окно.
Пример использования:
```typescript
const success = new Success(cloneTemplate(successTemplate), { onClick: () => modal.close() });
```

## 2. Взаимодействие компонентов с событиями

Приложение активно использует **события**, чтобы компоненты могли взаимодействовать друг с другом. Это позволяет обновлять состояние интерфейса асинхронно, реагируя на действия пользователя или данные, полученные с сервера.

Пример:


```typescript
events.on('order:next', () => {
    const paymentMethod = order.getPaymentMethod(); 
    const address = (order.getContainer().elements.namedItem('address') as HTMLInputElement).value;

    orderBuilder.setPayment(paymentMethod);
    orderBuilder.setAddress(address);
    modal.render({ content: contacts.render({ email: '', phone: '', valid: false, errors: [] }) });
});
```


### События, связанные с изменением данных

1. **`items:changed`**
   - **Описание:** Происходит, когда изменяется список товаров (например, при добавлении или удалении товара).
   - **Действия:**
     - Перерисовать блок с карточками товаров.
     - Обновить каталог товаров.
   - **Генерируется:** При изменении каталога товаров, например, после успешного получения данных с сервера через api.`getProductList()` или при изменении списка через методы модели `AppState`..

2. **`order:response`**
   - **Описание:** Генерируется после получения ответа от сервера при создании нового заказа.
   - **Действия:**
     - Отобразить попап с сообщением об успешном оформлении заказа, указав общую сумму.
     - Очистить содержимое корзины.
     - Сбросить счётчик товаров в корзине.
   - **Генерируется:** После успешной отправки заказа на сервер через `api.postOrder(orderObject)`.

3. **`preview:changed`**
   - **Описание:** Происходит, когда изменяется выбранный для предпросмотра товар (например, при клике на карточку товара).
   - **Действия:**
     - Открыть попап с подробной информацией о выбранном товаре.
     - Обновить отображение выбранного товара.
   - **Генерируется:**При установке нового значения предпросмотра через `appData.setPreview(item)`.

### События, связанные с действиями пользователя

1. **`card:select`**
   - **Описание:** Происходит, когда пользователь кликает на карточку товара.
   - **Действия:**
     - Установить выбранный товар как текущий для предпросмотра.
     - Сгенерировать событие preview:changed для отображения информации о товаре.
   - **Генерируется:** При клике на карточку товара.

2. **`order:next`**
   - **Описание:** Событие возникает, когда пользователь завершает этап выбора товаров и переходит к заполнению данных заказа.
   - **Действия:**
     - Сохранить выбранный способ оплаты и адрес.
     - Показать форму для ввода контактных данных (почта, телефон).
   - **Генерируется:** При нажатии кнопки перехода к следующему этапу оформления заказа в интерфейсе заказа.

3. **`contactsForm:submit`**
   - **Описание:** Происходит при отправке формы с контактными данными (почта, телефон) пользователя.
   - **Действия:**
     - Сохранить введенные данные.
     - Подготовить и отправить заказ на сервер.
     - Сгенерировать событие `order:response` при успешном оформлении.
   - **Генерируется:** При отправке формы с контактными данными.

4. **`basket:open`**
   - **Описание:**Событие возникает, когда пользователь открывает корзину для просмотра.
   - **Действия:**
     - Открыть попап с содержимым корзины.
     - Показать товары, добавленные в корзину, и общую сумму.
   - **Генерируется:** При клике на иконку корзины или другой элемент, запускающий просмотр корзины.

5. **`items:delete`**
   - **Описание:**Происходит, когда пользователь удаляет товар из корзины.
   - **Действия:**
     - Удалить товар из списка корзины.
     - Обновить список идентификаторов товаров в корзине.
     - Уменьшить счетчик товаров на странице.
     - Перерисовать содержимое корзины.
   - **Генерируется:** При удалении товара из корзины через интерфейс корзины.

### Эмиттер событий
Для обработки событий используется эмиттер. Он позволяет слушать события и реагировать на них.

```typescript
export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Установить обработчик на событие
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)?.add(callback);
    }

    /**
     * Снять обработчик с события
     */
    off(eventName: EventName, callback: Subscriber) {
        if (this._events.has(eventName)) {
            this._events.get(eventName)!.delete(callback);
            if (this._events.get(eventName)?.size === 0) {
                this._events.delete(eventName);
            }
        }
    }

    /**
     * Инициировать событие с данными
     */
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    /**
     * Слушать все события
     */
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback);
    }

    /**
     * Сбросить все обработчики
     */
    offAll() {
        this._events = new Map<string, Set<Subscriber>>();
    }

    /**
     * Сделать коллбек триггер, генерирующий событие при вызове
     */
    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {})
            });
        };
    }
}
```