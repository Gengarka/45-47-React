import { useState } from "react"; 
import { menuData } from "../data/menu"; 
import MenuCard from "../components/MenuCard"; 
import { useCart } from "../hooks/useCart"; 
import type { MenuItem } from "../types/index"; 

// функция meta задает заголовок вкладки браузера
export function meta() {
    return [
        { title: "Меню | Чикенбурбе" } // заголовок страницы меню
    ];
}

export default function MenuPage() {
    // массив категорий для фильтрации
    const categories = ["Все", "Закуски", "Основные блюда", "Десерты", "Напитки"];
    // состояние для хранения текущей выбранной категории
    const [activeCategory, setActiveCategory] = useState("Все");
    // получение данных корзины из контекста: общее количество товаров и функция добавления
    const { totalCount, addItem } = useCart();

    // фильтрация меню в зависимости от выбранной категории
    const filteredMenu = activeCategory === "Все"
        ? menuData // если выбрано "Все", отображается полный список
        : menuData.filter(item => item.category === activeCategory); // иначе оставляем только нужную категорию

    // промежуточный обработчик добавления блюда в корзину
    const addToCart = (item: MenuItem) => {
        addItem(item);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8"> {/* контейнер для заголовка и счетчика */}
                <h1 className="text-4xl font-bold text-copper-900">Меню</h1> {/* заголовок страницы */}
                <span className="bg-copper-100 text-copper-800 px-4 py-2 rounded-full"> {/* счетчик блюд в корзине */}
                    {totalCount} блюд
                </span>
            </div>
            <div className="flex gap-3 mb-8 flex-wrap"> {/* контейнер для кнопок категорий */}
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)} // при нажатии меняется активная категория
                        className={`px-5 py-2 rounded-full border transition-colors ${activeCategory === cat ? "bg-copper-600 text-white border-copper-600" : "bg-white text-copper-800 border-copper-200 hover:bg-copper-50"}`} // динамические классы: активная кнопка — медный фон, неактивная — белый фон
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* сетка для карточек блюд: 1 колонка на мобилках, 2 на планшетах, 3 на десктопе */}
                {filteredMenu.map(item => (
                    <MenuCard key={item.id} item={item} onAddToCart={addToCart} /> 
                ))}
            </div>
        </div>
    );
}