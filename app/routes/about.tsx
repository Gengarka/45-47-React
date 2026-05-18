import { restaurantInfo } from "../data/restaurant"; 
const restaurantImage = new URL("../assets/restr.jpg", import.meta.url).href;

// функция meta задает заголовок вкладки браузера
export function meta() {
    return [{ title: "О нас | Ресторан" }];
}

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8"> {/* контейнер с ограничением максимальной ширины и центрированием */}
            <section className="bg-copper-50 rounded-3xl p-8 shadow-sm"> {/* секция с описанием ресторана */}
                <h1 className="text-3xl font-bold text-copper-900 mb-4">О нас</h1> {/* заголовок секции */}
                <p className="text-lg text-copper-700 leading-relaxed">
                    Наш ресторан — это место с уютной атмосферой и современной европейской кухней. {/* описание ресторана */}
                    Мы готовим блюда из свежих продуктов, уделяем внимание качеству
                    и создаём тёплую обстановку для гостей.
                </p>
            </section>

            <section className="grid gap-6 md:grid-cols-2"> {/* сетка: 1 колонка на мобилках, 2 на планшетах и выше */}
                <div className="rounded-3xl bg-white p-8 shadow-sm"> {/* блок с преимуществами */}
                    <h2 className="text-2xl font-semibold text-copper-900 mb-3">Наши преимущества</h2> {/* заголовок блока */}
                    <ul className="space-y-3 text-copper-700"> {/* список преимуществ */}
                        <li>Свежие ингредиенты и авторские рецепты</li>
                        <li>Быстрое обслуживание и внимательный персонал</li>
                        <li>Удобное расположение в центре города</li>
                        <li>Уютный интерьер и вечерняя атмосфера</li>
                    </ul>
                </div>
                <div className="rounded-3xl bg-white p-8 shadow-sm flex items-center justify-center"> {/* блок с изображением ресторана */}
                    <img 
                        src={restaurantImage} // путь к изображению ресторана
                        alt="Ресторан Чикенбурбе" // описание изображения
                        className="w-full h-auto rounded-2xl object-cover" // изображение на всю ширину с сохранением пропорций
                    />
                </div>
            </section>
        </div>
    );
}