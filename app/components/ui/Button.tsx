import type { ButtonHTMLAttributes, ReactNode } from "react";

// интерфейс свойств кнопки, наследует все стандартные html-атрибуты кнопки
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode; // содержимое кнопки
    variant?: "primary" | "secondary"; // вариант оформления
}

export default function Button({
    children,
    variant = "primary", // значение по умолчанию
    className = "",
    ...props // остальные параметры собираются в объект ...props
}: ButtonProps) {
    // базовые CSS-классы, которые применяются ко всем кнопкам
    const baseClass = "px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50";
    // объект, который содержит варианты оформления кнопки
    const variants = {
        primary: "bg-copper-600 text-white hover:bg-copper-700", 
        secondary: "bg-stone-200 text-stone-700 hover:bg-stone-300", 
    };

    return (
        <button
            // строка, собранная с помощью шаблонных литералов (базовые стили + стили варианта + дополнительные классы)
            className={`${baseClass} ${variants[variant]} ${className}`}
            {...props} // передает все оставшиеся свойства непосредственно в HTML-элемент
        >
            {children} {/* содержимое кнопки */}
        </button>
    );
}