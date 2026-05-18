// интерфейс, описывающий структуру одного блюда в меню ресторана
export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: "Закуски" | "Основные блюда" | "Десерты" | "Напитки";
    image: string;
}

// интерфейс, описывающий структуру одного товара в корзине
export interface CartItem {
    menuItem: MenuItem;
    quantity: number;
}

// интерфейс, описывающий информацию о ресторане для отображения на страницах
export interface RestaurantInfo {
    name: string;
    address: string;
    phone: string;
    workHours: string;
}

// интерфейс, описывающий данные заказа при оформлении
export interface OrderData {
    items: CartItem[];
    total: number;
    customerName: string;
}