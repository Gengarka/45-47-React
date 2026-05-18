import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean; // отвечает за отображение модального окна
    onClose: () => void; // функция, которая вызывается при закрытии окна
    children: ReactNode; // передача внутреннего содержимого
    title: string; // заголовок окна
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    // если окно закрыто, компонент ничего не отображает
    if (!isOpen) return null;

    return (
        // первый блок растягивается на весь экран 
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* блок занимает весь экран и имеет полупрозрачный черный цвет, при нажатии вызывается onClose */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            {/* само модальное окно: белый фон, скругленные углы, внутренние отступы, ограничение ширины и тень */}
            <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {/* кнопка с крестиком, при нажатии вызывается onClose */}
                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-stone-600 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>
                {children} {/* содержимое, переданное внутрь модального окна */}
            </div>
        </div>
    );
}