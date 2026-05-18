import { Link, NavLink } from "react-router"; // компоненты для навигации без перезагрузки страницы

export default function Header() {
    return (
        <header className="bg-copper-800 text-white shadow-md"> 
            <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"> {/* логотип и ссылки навигации */}
                <Link to="/" className="text-2xl font-bold">Home</Link> {/* ссылка на главную страницу */}
                <div className="flex gap-8 text-lg"> {/* контейнер для пунктов меню */}
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "text-white hover:text-black" : "text-white"} // если ссылка активна, применяется стиль активного пункта
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) => isActive ? "text-white hover:text-black" : "text-white"}
                    >
                        Меню
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) => isActive ? "text-white hover:text-black" : "text-white"}
                    >
                        Корзина
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? "text-white hover:text-black" : "text-white"}
                    >
                        О нас
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}