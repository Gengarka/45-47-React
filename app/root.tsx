import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router"; // импорт специальных компонентов из react router
import Header from "./components/Header"; // компонент шапки
import Footer from "./components/Footer"; // компонент подвала
import { CartProvider } from "./hooks/useCart"; // провайдер контекста корзины
import "./app.css"; // глобальные стили приложения

export default function RootLayout() {
    return (
        <html lang="ru"> {/* указание языка для правильного отображения текста */}
            <head>
                <meta charSet="utf-8" /> {/* кодировка для корректного отображения символов */}
                <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* адаптивность на мобильных устройствах */}
                <Meta /> {/* подключение метаинформации страницы */}
                <Links /> {/* подключение внешних ресурсов */}
            </head>
            <body>
                <CartProvider> {/* провайдер делает данные корзины доступными на всех страницах */}
                    <div className="min-h-screen flex flex-col"> {/* контейнер с минимальной высотой экрана и flex-разметкой для прижатия футера */}
                        <Header /> {/* шапка отображается в верхней части страницы */}
                        <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full"> {/* основное содержимое, flex-grow прижимает футер вниз */}
                            <Outlet /> {/* место для отображения содержимого текущего маршрута */}
                        </main>
                        <Footer /> {/* подвал отображается в нижней части страницы */}
                    </div>
                </CartProvider>
                <ScrollRestoration /> {/* восстановление позиции прокрутки при переходах между страницами */}
                <Scripts /> {/* автоматическое подключение скриптов приложения */}
            </body>
        </html>
    );
}