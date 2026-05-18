import { type RouteConfig, index, route } from "@react-router/dev/routes";

// массив маршрутов приложения, каждый связывает url-адрес с react-компонентом
export default [
    index("routes/home.tsx"), // корневой маршрут, страница по адресу /
    route("menu", "routes/menu.tsx"), // страница меню по адресу /menu
    route("cart", "routes/cart.tsx"), // страница корзины по адресу /cart
    route("checkout", "routes/checkout.tsx"), // страница оформления заказа по адресу /checkout
    route("about", "routes/about.tsx"), // страница информации о ресторане по адресу /about
] satisfies RouteConfig; // satisfies routeconfig проверяет соответствие структуры типу для типобезопасности