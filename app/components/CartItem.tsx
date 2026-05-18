import type { CartItem as CartItemType } from "../types/index"; // импорт типа cartitem, переименован для избежания конфликта имен

interface CartItemProps {
    item: CartItemType; // объект корзины
    onUpdateQuantity: (id: number, quantity: number) => void; // функция изменения количества товара
}

export default function CartItem({ item, onUpdateQuantity }: CartItemProps) {
    const { menuItem, quantity } = item; // деструктуризация для доступа к вложенному объекту блюда и количеству

    return (
        <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"> {/* карточка товара */}
            <img
                src={menuItem.image} // изображение блюда
                alt={menuItem.name} // описание изображения
                className="w-20 h-20 object-cover rounded-lg" // фиксированный размер 20x20
            />
            <div className="flex-grow"> {/* блок с информацией о товаре */}
                <h3 className="font-bold text-stone-800">{menuItem.name}</h3> {/* название блюда */}
                <p className="text-copper-700 font-medium">
                    {menuItem.price} ₽ | {quantity} шт = {menuItem.price * quantity} ₽ {/* общая стоимость для выбранного количества */}
                </p>
            </div>
            <div className="flex items-center gap-2"> {/* блок управления количеством */}
                <button
                    onClick={() => onUpdateQuantity(menuItem.id, quantity - 1)} // уменьшение количества
                    className="w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center"
                >
                    -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span> {/* текущее количество */}
                <button
                    onClick={() => onUpdateQuantity(menuItem.id, quantity + 1)} // увеличение количества
                    className="w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center"
                >
                    +
                </button>
            </div>
        </div>
    );
}