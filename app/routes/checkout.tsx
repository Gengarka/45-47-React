import { useState, type SubmitEvent } from "react"; 
import { Link, useNavigate } from "react-router"; 
import { useCart } from "../hooks/useCart";
import Modal from "../components/ui/Modal"; 
import Button from "../components/ui/Button"; 

// функция meta задает заголовок вкладки браузера
export function meta() {
    return [{ title: "Оформление заказа | Ресторан" }];
}

export default function CheckoutPage() {
    // получение данных корзины из контекста
    const { items, totalAmount, clearCart } = useCart();
    const navigate = useNavigate(); 

    // состояния для хранения данных формы
    const [name, setName] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [comment, setComment] = useState(""); 
    const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card"); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isProcessing, setIsProcessing] = useState(false); 

    // условный рендеринг: если корзина пуста, отображается сообщение и ссылка на меню
    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-stone-700 mb-4">
                    Нечего оформлять
                </h2>
                <Link to="/menu" className="text-copper-600 hover:underline text-lg">
                    Перейти в меню
                </Link>
            </div>
        );
    }

    // обработчик отправки формы
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // отмена стандартного поведения формы 
        // проверка заполнения имени и телефона
        if (!name.trim() || !phone.trim()) {
            alert("Заполните имя и телефон");
            return;
        }
        setIsProcessing(true); // включение состояния обработки, блокировка кнопок

        // имитация задержки обработки платежа через 2 секунды
        setTimeout(() => {
            setIsProcessing(false); 
            setIsModalOpen(true); 
        }, 2000);
    };

    // закрытие модального окна и очистка корзины
    const handleCloseModal = () => {
        setIsModalOpen(false); // 
        clearCart();  
        navigate("/"); 
    };

    return (
        <div className="max-w-2xl mx-auto"> {/* контейнер с ограничением максимальной ширины */}
            <h1 className="text-4xl font-bold text-copper-900 mb-8 text-center">
                Оформление заказа
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6"> {/* форма с обработчиком отправки */}
                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Ваше имя *
                    </label>
                    <input
                        type="text"
                        value={name} // управляемый компонент: значение связано с состоянием
                        onChange={(e) => setName(e.target.value)} // обновление состояния при вводе
                        required
                        className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper-400"
                        placeholder="Лёха Карпов"
                    />
                </div>

                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Телефон *
                    </label>
                    <input
                        type="tel"
                        value={phone} // управляемый компонент
                        onChange={(e) => setPhone(e.target.value)} // обновление состояния при вводе
                        required
                        className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper-400"
                        placeholder="+7 (964) 666-69-67"
                    />
                </div>

                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Комментарий к заказу
                    </label>
                    <textarea
                        value={comment} // управляемый компонент
                        onChange={(e) => setComment(e.target.value)} // обновление состояния при вводе
                        className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper-400"
                        rows={3}
                        placeholder="Пожелания, аллергии..."
                    />
                </div>

                <div>
                    <label className="block text-stone-700 font-medium mb-2">
                        Способ оплаты
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"} // активен, если выбран способ "card"
                                onChange={() => setPaymentMethod("card")} // изменение способа оплаты
                                className="accent-copper-600"
                            />
                            Картой онлайн
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="cash"
                                checked={paymentMethod === "cash"} // активен, если выбран способ "cash"
                                onChange={() => setPaymentMethod("cash")} // изменение способа оплаты
                                className="accent-copper-600"
                            />
                            Наличными
                        </label>
                    </div>
                </div>

                <div className="bg-stone-100 rounded-2xl p-5"> {/* блок с итогами заказа */}
                    <h3 className="font-bold text-stone-800 mb-3">Ваш заказ:</h3>
                    {items.map((item) => (
                        <div key={item.menuItem.id}>
                            <div className="flex justify-between text-stone-600 py-1">
                                <span>
                                    {item.menuItem.name} × {item.quantity} {/* название блюда*/}
                                </span>
                                <span>{item.menuItem.price * item.quantity} ₽</span> {/* стоимость*/}
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-stone-300 mt-3 pt-3 flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span className="text-copper-700">{totalAmount} ₽</span> {/* общая сумма заказа */}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isProcessing} // блокировка кнопки во время обработки
                    className="w-full py-4 text-lg"
                >
                    {isProcessing ? "Обработка платежа..." : "Оплатить заказ"} {/* динамический текст кнопки */}
                </Button>
            </form>

            {/* модальное окно подтверждения заказа */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Заказ оформлен!">
                <div className="text-center py-4">
                    <p className="text-lg text-stone-700 mb-2">
                        Спасибо, {name}! {/* подстановка имени пользователя */}
                    </p>
                    <p className="text-stone-500 mb-6">
                        Ваш заказ на сумму {totalAmount} ₽ принят. {/* подстановка суммы заказа */}
                        Мы свяжемся с вами по телефону {phone}. {/* подстановка телефона */}
                    </p>
                    <Button onClick={handleCloseModal} className="w-full">
                        На главную
                    </Button>
                </div>
            </Modal>
        </div>
    );
}