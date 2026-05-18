import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, MenuItem } from "../types/index";

// интерфейс, описывающий структуру значения корзины, которое будет доступно через контекст
interface CartContextValue {
    items: CartItem[]; // массив товаров в корзине
    totalAmount: number; // общая стоимость всех товаров
    totalCount: number; // общее количество товаров
    addItem: (item: MenuItem) => void; // добавление товара
    updateQuantity: (id: number, newQty: number) => void; // изменение количества товара
    removeItem: (id: number) => void; // удаление позиции
    clearCart: () => void; // полная очистка корзины
}

// создание контекста для глобального хранилища корзины
const CartContext = createContext<CartContextValue | null>(null);

// компонент-провайдер, который предоставляет данные корзины всем вложенным компонентам
export function CartProvider({ children }: { children: ReactNode }) {
    // состояние, где хранится массив товаров корзины
    const [items, setItems] = useState<CartItem[]>([]);

    // вычисление общей суммы заказа с помощью useMemo 
    const totalAmount = useMemo(
        () => items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
        [items]
    );

    // вычисление общего количества товаров в корзине
    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    // добавление товара в корзину
    const addItem = (menuItem: MenuItem) => {
        setItems((prev) => {
            // проверка, существует ли уже такой товар в корзине
            const existing = prev.find((item) => item.menuItem.id === menuItem.id);
            if (existing) {
                // если товар найден, увеличиваем его количество
                return prev.map((item) =>
                    item.menuItem.id === menuItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // если товара нет, создаём новую запись с количеством 1
            return [...prev, { menuItem, quantity: 1 }];
        });
    };

    // изменение количества товара
    const updateQuantity = (id: number, newQty: number) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.menuItem.id === id ? { ...item, quantity: newQty } : item
                )
                .filter((item) => item.quantity > 0) // удаляем товары с количеством меньше или равным нулю
        );
    };

    // полное удаление товара по идентификатору
    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.menuItem.id !== id));
    };

    // очистка всей корзины
    const clearCart = () => {
        setItems([]);
    };

    // возвращаем провайдер, который делает данные доступными для дочерних компонентов
    return (
        <CartContext.Provider
            value={{ items, totalAmount, totalCount, addItem, updateQuantity, removeItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

// пользовательский хук для удобной работы с корзиной
export function useCart() {
    const context = useContext(CartContext);
    // проверка, чтобы хук использовался только внутри провайдера
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}