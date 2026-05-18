import { Link } from "react-router"; 
import { useCart } from "../hooks/useCart"; 

// функция meta задает заголовок вкладки браузера
export function meta() {
    return [{ title: "Корзина | Ресторан" }];
}

export default function CartPage() {
    // получение данных корзины из контекста
    const { items, totalAmount, updateQuantity } = useCart();

    //если корзина пуста, отображается сообщение и ссылка на меню
    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
                <Link to="/menu" className="text-copper-600 hover:underline text-lg">
                    Перейти в меню
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-copper-900 mb-8">Корзина</h1>
            <div className="flex flex-col lg:flex-row gap-8"> {/*на десктопе в ряд, на мобилках в столбец */}
                <div className="flex-grow space-y-4"> {/* список товаров */}
                    {items.map((item) => (
                        <div key={item.menuItem.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"> {/* карточка товара */}
                            <img
                                src={item.menuItem.image} // изображение блюда
                                alt={item.menuItem.name} // описание изображения
                                className="w-24 h-24 object-cover rounded-lg" // фиксированный размер 24x24
                            />
                            <div className="flex-grow"> {/* блок с информацией о товаре */}
                                <h3 className="font-bold text-lg text-stone-800">{item.menuItem.name}</h3> 
                                <p className="text-copper-700 font-medium">
                                    {item.menuItem.price} ₽
                                </p>
                            </div>
                            <div className="flex items-center gap-3"> {/* блок управления количеством */}
                                <button
                                    onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)} // уменьшение количества
                                    className="w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center text-xl"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span> {/* текущее количество */}
                                <button
                                    onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)} // увеличение количества
                                    className="w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center text-xl"
                                >
                                    +
                                </button>
                            </div>
                            <div className="text-right min-w-[100px]"> {/* блок с итоговой суммой за товар */}
                                <p className="font-bold text-copper-800 text-lg">
                                    {item.menuItem.price * item.quantity} ₽ {/* общая стоимость для выбранного количества */}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:w-80 bg-stone-50 rounded-xl p-6 h-fit"> {/* блок с итоговой информацией */}
                    <h2 className="text-xl font-bold mb-4">Итого</h2> {/* заголовок блока */}
                    <div className="flex justify-between text-lg mb-4">
                        <span>Сумма:</span>
                        <span className="font-bold text-copper-700">{totalAmount} ₽</span> {/* общая сумма заказа */}
                    </div>
                    <Link
                        to="/checkout" // переход на страницу оформления заказа
                        className="block w-full bg-copper-600 text-white text-center py-3 rounded-xl hover:bg-copper-700 transition-colors"
                    >
                        Оформить заказ
                    </Link>
                </div>
            </div>
        </div>
    );
}