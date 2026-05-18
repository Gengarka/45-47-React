import { Link } from "react-router"; // компонент link для навигации между страницами без перезагрузки браузера
import { restaurantInfo } from "../data/restaurant"; // импорт информации о ресторане

// функция meta отвечает за настройку метаданных страницы (заголовок вкладки браузера)
export function meta() {
    return [
        { title: `${restaurantInfo.name} | Чикенбурбе` } // заголовок страницы
    ];
}

export default function HomePage() {
    return (
        <div className="text-center space-y-8"> {/* контейнер с центрированием текста и вертикальными отступами */}
            <h1 className="text-5xl font-bold text-copper-900 mt-12">
                {restaurantInfo.name} {/* название ресторана из объекта данных */}
            </h1>
            <p className="text-xl text-copper-700 max-w-2xl mx-auto">
                Изысканная столовая в центре города. {/* краткое описание ресторана */}
            </p>
            <Link
                to="/menu" 
                className="inline-block bg-copper-600 text-white px-6 py-3 rounded-xl hover:bg-copper-700 transition-colors" 
            >
                Смотреть меню
            </Link>
        </div>
    );
}