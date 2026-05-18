import type { MenuItem } from "../types/index"; // импорт типа menuitem из папки types

interface Props {
    item: MenuItem; // объект блюда
    onAddToCart: (item: MenuItem) => void; // функция, которая вызывается при добавлении товара в корзину
}

export default function MenuCard({ item, onAddToCart }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"> {/* карточка с белым фоном, скругленными углами и тенью */}
            <img
                src={item.image} // путь к изображению блюда
                alt={item.name} // текстовое описание изображения
                className="w-full h-48 object-cover" // изображение на всю ширину
            />
            <div className="p-5"> {/* внутренние отступы */}
                <div className="flex justify-between items-start mb-2"> {/* контейнер для названия и цены */}
                    <h3 className="font-bold text-lg">{item.name}</h3> {/* название блюда */}
                    <span className="text-copper-700 font-bold">{item.price} ₽</span> {/* цена */}
                </div>
                <p className="text-sm text-stone-500 mb-4">{item.description}</p> {/* описание блюда */}
                <button
                    onClick={() => onAddToCart(item)} // при нажатии передается текущее блюдо в обработчик
                    className="w-full bg-copper-600 text-white py-2 rounded-xl hover:bg-copper-700 transition-colors" // кнопка добавления в корзину
                >
                    В корзину
                </button>
            </div>
        </div>
    );
}