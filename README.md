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
## Архитектура проекта

### Компоненты Модели (бизнес-логика)

1. **Product**
   - Отвечает за получение данных о продуктах.
   - Методы:
     - `getAllProducts()`: Получить список всех продуктов.
     - `getProductById(id: string)`: Получить конкретный продукт по ID.

2. **Order**
   - Отвечает за создание заказов и их валидацию.
   - Методы:
     - `createOrder(orderData: object)`: Создать новый заказ.
     - `validateOrder(orderData: object)`: Проверить корректность данных заказа.

3. **APIService**
   - Отвечает за выполнение HTTP-запросов к серверу.
   - Методы:
     - `get(url: string)`: Выполнить GET-запрос.
     - `post(url: string, data: object)`: Выполнить POST-запрос.

### Компоненты Представления (UI)

1. **ProductView**
   - Отображает список продуктов или конкретный продукт.
   - Методы:
     - `renderProductList(products: object[])`: Отобразить список всех продуктов.
     - `renderProductDetails(product: object)`: Отобразить детали конкретного продукта.

2. **OrderView**
   - Отображает информацию о заказе и форму для его создания.
   - Методы:
     - `renderOrderForm()`: Отобразить форму для создания заказа.
     - `showOrderConfirmation(order: object)`: Показать подтверждение успешного заказа.

### Брокер событий (EventEmitter)

1. **EventEmitter**
   - Отвечает за управление событиями в приложении.
   - Методы:
     - `on(event: string, listener: function)`: Подписаться на событие.
     - `emit(event: string, data: object)`: Эмитировать событие с данными.
     - `off(event: string, listener: function)`: Удалить слушателя события.

### Описание процессов

- **Модель** (Product, Order) обрабатывает данные и выполняет запросы к серверу.
- **Представление** (ProductView, OrderView) отвечает за отображение данных на интерфейсе пользователя.
- **Брокер событий** (EventEmitter) обеспечивает взаимодействие между компонентами через события.
