import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/components/Header.tsx
function Header() {
	return /* @__PURE__ */ jsx("header", {
		className: "bg-copper-800 text-white shadow-md",
		children: /* @__PURE__ */ jsxs("nav", {
			className: "max-w-6xl mx-auto px-4 py-4 flex justify-between items-center",
			children: [
				" ",
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "text-2xl font-bold",
					children: "Home"
				}),
				" ",
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-8 text-lg",
					children: [
						" ",
						/* @__PURE__ */ jsx(NavLink, {
							to: "/",
							className: ({ isActive }) => isActive ? "text-white hover:text-black" : "text-white",
							children: "Главная"
						}),
						/* @__PURE__ */ jsx(NavLink, {
							to: "/menu",
							className: ({ isActive }) => isActive ? "text-white hover:text-black" : "text-white",
							children: "Меню"
						}),
						/* @__PURE__ */ jsx(NavLink, {
							to: "/cart",
							className: ({ isActive }) => isActive ? "text-white hover:text-black" : "text-white",
							children: "Корзина"
						}),
						/* @__PURE__ */ jsx(NavLink, {
							to: "/about",
							className: ({ isActive }) => isActive ? "text-white hover:text-black" : "text-white",
							children: "О нас"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region app/data/restaurant.ts
var restaurantInfo = {
	name: "Chikenburbe",
	address: "ул. Косяковых 228",
	phone: "+7 (666) 964-67-69",
	workHours: "Пн-Вс: 16:00 - 05:00"
};
//#endregion
//#region app/components/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "bg-copper-950 text-copper-100 py-8 mt-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto px-4 text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-lg font-bold text-white mb-2",
					children: restaurantInfo.name
				}),
				/* @__PURE__ */ jsx("p", { children: restaurantInfo.address }),
				/* @__PURE__ */ jsx("p", { children: restaurantInfo.phone }),
				/* @__PURE__ */ jsx("p", { children: restaurantInfo.workHours })
			]
		})
	});
}
//#endregion
//#region app/hooks/useCart.tsx
var CartContext = createContext(null);
function CartProvider({ children }) {
	const [items, setItems] = useState([]);
	const totalAmount = useMemo(() => items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0), [items]);
	const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
	const addItem = (menuItem) => {
		setItems((prev) => {
			if (prev.find((item) => item.menuItem.id === menuItem.id)) return prev.map((item) => item.menuItem.id === menuItem.id ? {
				...item,
				quantity: item.quantity + 1
			} : item);
			return [...prev, {
				menuItem,
				quantity: 1
			}];
		});
	};
	const updateQuantity = (id, newQty) => {
		setItems((prev) => prev.map((item) => item.menuItem.id === id ? {
			...item,
			quantity: newQty
		} : item).filter((item) => item.quantity > 0));
	};
	const removeItem = (id) => {
		setItems((prev) => prev.filter((item) => item.menuItem.id !== id));
	};
	const clearCart = () => {
		setItems([]);
	};
	return /* @__PURE__ */ jsx(CartContext.Provider, {
		value: {
			items,
			totalAmount,
			totalCount,
			addItem,
			updateQuantity,
			removeItem,
			clearCart
		},
		children
	});
}
function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({ default: () => root_default });
var root_default = UNSAFE_withComponentProps(function RootLayout() {
	return /* @__PURE__ */ jsxs("html", {
		lang: "ru",
		children: [
			" ",
			/* @__PURE__ */ jsxs("head", { children: [
				/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
				" ",
				/* @__PURE__ */ jsx("meta", {
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				}),
				" ",
				/* @__PURE__ */ jsx(Meta, {}),
				" ",
				/* @__PURE__ */ jsx(Links, {}),
				" "
			] }),
			/* @__PURE__ */ jsxs("body", { children: [
				/* @__PURE__ */ jsxs(CartProvider, { children: [" ", /* @__PURE__ */ jsxs("div", {
					className: "min-h-screen flex flex-col",
					children: [
						" ",
						/* @__PURE__ */ jsx(Header, {}),
						" ",
						/* @__PURE__ */ jsxs("main", {
							className: "flex-grow max-w-6xl mx-auto px-4 py-8 w-full",
							children: [
								" ",
								/* @__PURE__ */ jsx(Outlet, {}),
								" "
							]
						}),
						/* @__PURE__ */ jsx(Footer, {}),
						" "
					]
				})] }),
				/* @__PURE__ */ jsx(ScrollRestoration, {}),
				" ",
				/* @__PURE__ */ jsx(Scripts, {}),
				" "
			] })
		]
	});
});
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$4
});
function meta$4() {
	return [{ title: `${restaurantInfo.name} | Чикенбурбе` }];
}
var home_default = UNSAFE_withComponentProps(function HomePage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "text-center space-y-8",
		children: [
			" ",
			/* @__PURE__ */ jsxs("h1", {
				className: "text-5xl font-bold text-copper-900 mt-12",
				children: [restaurantInfo.name, " "]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xl text-copper-700 max-w-2xl mx-auto",
				children: "Изысканная столовая в центре города. "
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/menu",
				className: "inline-block bg-copper-600 text-white px-6 py-3 rounded-xl hover:bg-copper-700 transition-colors",
				children: "Смотреть меню"
			})
		]
	});
});
//#endregion
//#region app/data/menu.ts
var menuData = [
	{
		id: 1,
		name: "Крем-суп из тыквы",
		description: "Нежный крем-суп из запечённой тыквы с имбирём и каплей кокосовых сливок",
		price: 320,
		category: "Закуски",
		image: new URL("../assets/soupPumpkin.jpeg", import.meta.url).href
	},
	{
		id: 2,
		name: "Брускетта с ростбифом",
		description: "Хрустящая брускетта с тонкими ломтиками ростбифа, вялеными томатами и рукколой",
		price: 380,
		category: "Закуски",
		image: new URL("../assets/brusketta.jpg", import.meta.url).href
	},
	{
		id: 3,
		name: "Стейк из лосося",
		description: "Сочный стейк из лосося на гриле с лимонным соусом и спаржей",
		price: 720,
		category: "Основные блюда",
		image: new URL("../assets/stakeLosos.jpg", import.meta.url).href
	},
	{
		id: 4,
		name: "Паста карбонара",
		description: "Классическая итальянская паста с беконом, яичным желтком и пармезаном",
		price: 480,
		category: "Основные блюда",
		image: new URL("../assets/PastaKarbonara.jpg", import.meta.url).href
	},
	{
		id: 5,
		name: "Утиная ножка конфы",
		description: "Медленно томлёная утиная ножка с карамелизированным луком и ягодным соусом",
		price: 650,
		category: "Основные блюда",
		image: new URL("../assets/duckLeg.jpg", import.meta.url).href
	},
	{
		id: 6,
		name: "Тирамису",
		description: "Десерт на основе маскарпоне, кофе эспрессо и какао с нотками ванили",
		price: 290,
		category: "Десерты",
		image: new URL("../assets/tiranisu.jpg", import.meta.url).href
	},
	{
		id: 7,
		name: "Облепиховый чай",
		description: "Согревающий чай из облепихи с мёдом, корицей и долькой апельсина",
		price: 180,
		category: "Напитки",
		image: new URL("../assets/oblepihaTea.jpg", import.meta.url).href
	}
];
//#endregion
//#region app/components/MenuCard.tsx
function MenuCard({ item, onAddToCart }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow",
		children: [
			" ",
			/* @__PURE__ */ jsx("img", {
				src: item.image,
				alt: item.name,
				className: "w-full h-48 object-cover"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "p-5",
				children: [
					" ",
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-start mb-2",
						children: [
							" ",
							/* @__PURE__ */ jsx("h3", {
								className: "font-bold text-lg",
								children: item.name
							}),
							" ",
							/* @__PURE__ */ jsxs("span", {
								className: "text-copper-700 font-bold",
								children: [item.price, " ₽"]
							}),
							" "
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-stone-500 mb-4",
						children: item.description
					}),
					" ",
					/* @__PURE__ */ jsx("button", {
						onClick: () => onAddToCart(item),
						className: "w-full bg-copper-600 text-white py-2 rounded-xl hover:bg-copper-700 transition-colors",
						children: "В корзину"
					})
				]
			})
		]
	});
}
//#endregion
//#region app/routes/menu.tsx
var menu_exports = /* @__PURE__ */ __exportAll({
	default: () => menu_default,
	meta: () => meta$3
});
function meta$3() {
	return [{ title: "Меню | Чикенбурбе" }];
}
var menu_default = UNSAFE_withComponentProps(function MenuPage() {
	const categories = [
		"Все",
		"Закуски",
		"Основные блюда",
		"Десерты",
		"Напитки"
	];
	const [activeCategory, setActiveCategory] = useState("Все");
	const { totalCount, addItem } = useCart();
	const filteredMenu = activeCategory === "Все" ? menuData : menuData.filter((item) => item.category === activeCategory);
	const addToCart = (item) => {
		addItem(item);
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between items-center mb-8",
			children: [
				" ",
				/* @__PURE__ */ jsx("h1", {
					className: "text-4xl font-bold text-copper-900",
					children: "Меню"
				}),
				" ",
				/* @__PURE__ */ jsxs("span", {
					className: "bg-copper-100 text-copper-800 px-4 py-2 rounded-full",
					children: [
						" ",
						totalCount,
						" блюд"
					]
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex gap-3 mb-8 flex-wrap",
			children: [" ", categories.map((cat) => /* @__PURE__ */ jsx("button", {
				onClick: () => setActiveCategory(cat),
				className: `px-5 py-2 rounded-full border transition-colors ${activeCategory === cat ? "bg-copper-600 text-white border-copper-600" : "bg-white text-copper-800 border-copper-200 hover:bg-copper-50"}`,
				children: cat
			}, cat))]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
			children: [" ", filteredMenu.map((item) => /* @__PURE__ */ jsx(MenuCard, {
				item,
				onAddToCart: addToCart
			}, item.id))]
		})
	] });
});
//#endregion
//#region app/routes/cart.tsx
var cart_exports = /* @__PURE__ */ __exportAll({
	default: () => cart_default,
	meta: () => meta$2
});
function meta$2() {
	return [{ title: "Корзина | Ресторан" }];
}
var cart_default = UNSAFE_withComponentProps(function CartPage() {
	const { items, totalAmount, updateQuantity } = useCart();
	if (items.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "text-center py-20",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-2xl font-bold mb-4",
			children: "Корзина пуста"
		}), /* @__PURE__ */ jsx(Link, {
			to: "/menu",
			className: "text-copper-600 hover:underline text-lg",
			children: "Перейти в меню"
		})]
	});
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
		className: "text-3xl font-bold text-copper-900 mb-8",
		children: "Корзина"
	}), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col lg:flex-row gap-8",
		children: [
			" ",
			/* @__PURE__ */ jsxs("div", {
				className: "flex-grow space-y-4",
				children: [" ", items.map((item) => /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm",
					children: [
						" ",
						/* @__PURE__ */ jsx("img", {
							src: item.menuItem.image,
							alt: item.menuItem.name,
							className: "w-24 h-24 object-cover rounded-lg"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-grow",
							children: [
								" ",
								/* @__PURE__ */ jsx("h3", {
									className: "font-bold text-lg text-stone-800",
									children: item.menuItem.name
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-copper-700 font-medium",
									children: [item.menuItem.price, " ₽"]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								" ",
								/* @__PURE__ */ jsx("button", {
									onClick: () => updateQuantity(item.menuItem.id, item.quantity - 1),
									className: "w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center text-xl",
									children: "-"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "w-8 text-center font-medium",
									children: item.quantity
								}),
								" ",
								/* @__PURE__ */ jsx("button", {
									onClick: () => updateQuantity(item.menuItem.id, item.quantity + 1),
									className: "w-8 h-8 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center text-xl",
									children: "+"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "text-right min-w-[100px]",
							children: [" ", /* @__PURE__ */ jsxs("p", {
								className: "font-bold text-copper-800 text-lg",
								children: [item.menuItem.price * item.quantity, " ₽ "]
							})]
						})
					]
				}, item.menuItem.id))]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lg:w-80 bg-stone-50 rounded-xl p-6 h-fit",
				children: [
					" ",
					/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold mb-4",
						children: "Итого"
					}),
					" ",
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between text-lg mb-4",
						children: [
							/* @__PURE__ */ jsx("span", { children: "Сумма:" }),
							/* @__PURE__ */ jsxs("span", {
								className: "font-bold text-copper-700",
								children: [totalAmount, " ₽"]
							}),
							" "
						]
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/checkout",
						className: "block w-full bg-copper-600 text-white text-center py-3 rounded-xl hover:bg-copper-700 transition-colors",
						children: "Оформить заказ"
					})
				]
			})
		]
	})] });
});
//#endregion
//#region app/components/ui/Modal.tsx
function Modal({ isOpen, onClose, children, title }) {
	if (!isOpen) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 bg-black/50",
			onClick: onClose
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-center mb-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold",
						children: title
					}), /* @__PURE__ */ jsx("button", {
						onClick: onClose,
						className: "text-stone-400 hover:text-stone-600 text-2xl leading-none",
						children: "×"
					})]
				}),
				children,
				" "
			]
		})]
	});
}
//#endregion
//#region app/components/ui/Button.tsx
function Button({ children, variant = "primary", className = "", ...props }) {
	return /* @__PURE__ */ jsxs("button", {
		className: `px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 ${{
			primary: "bg-copper-600 text-white hover:bg-copper-700",
			secondary: "bg-stone-200 text-stone-700 hover:bg-stone-300"
		}[variant]} ${className}`,
		...props,
		children: [children, " "]
	});
}
//#endregion
//#region app/routes/checkout.tsx
var checkout_exports = /* @__PURE__ */ __exportAll({
	default: () => checkout_default,
	meta: () => meta$1
});
function meta$1() {
	return [{ title: "Оформление заказа | Ресторан" }];
}
var checkout_default = UNSAFE_withComponentProps(function CheckoutPage() {
	const { items, totalAmount, clearCart } = useCart();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [comment, setComment] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("card");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	if (items.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "text-center py-20",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-2xl font-bold text-stone-700 mb-4",
			children: "Нечего оформлять"
		}), /* @__PURE__ */ jsx(Link, {
			to: "/menu",
			className: "text-copper-600 hover:underline text-lg",
			children: "Перейти в меню"
		})]
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name.trim() || !phone.trim()) {
			alert("Заполните имя и телефон");
			return;
		}
		setIsProcessing(true);
		setTimeout(() => {
			setIsProcessing(false);
			setIsModalOpen(true);
		}, 2e3);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
		clearCart();
		navigate("/");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-2xl mx-auto",
		children: [
			" ",
			/* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-bold text-copper-900 mb-8 text-center",
				children: "Оформление заказа"
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [
					" ",
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-stone-700 font-medium mb-2",
						children: "Ваше имя *"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true,
						className: "w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper-400",
						placeholder: "Лёха Карпов"
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-stone-700 font-medium mb-2",
						children: "Телефон *"
					}), /* @__PURE__ */ jsx("input", {
						type: "tel",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						required: true,
						className: "w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper-400",
						placeholder: "+7 (964) 666-69-67"
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-stone-700 font-medium mb-2",
						children: "Комментарий к заказу"
					}), /* @__PURE__ */ jsx("textarea", {
						value: comment,
						onChange: (e) => setComment(e.target.value),
						className: "w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper-400",
						rows: 3,
						placeholder: "Пожелания, аллергии..."
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "block text-stone-700 font-medium mb-2",
						children: "Способ оплаты"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-6",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ jsx("input", {
								type: "radio",
								value: "card",
								checked: paymentMethod === "card",
								onChange: () => setPaymentMethod("card"),
								className: "accent-copper-600"
							}), "Картой онлайн"]
						}), /* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ jsx("input", {
								type: "radio",
								value: "cash",
								checked: paymentMethod === "cash",
								onChange: () => setPaymentMethod("cash"),
								className: "accent-copper-600"
							}), "Наличными"]
						})]
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-stone-100 rounded-2xl p-5",
						children: [
							" ",
							/* @__PURE__ */ jsx("h3", {
								className: "font-bold text-stone-800 mb-3",
								children: "Ваш заказ:"
							}),
							items.map((item) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
								className: "flex justify-between text-stone-600 py-1",
								children: [
									/* @__PURE__ */ jsxs("span", { children: [
										item.menuItem.name,
										" × ",
										item.quantity,
										" "
									] }),
									/* @__PURE__ */ jsxs("span", { children: [item.menuItem.price * item.quantity, " ₽"] }),
									" "
								]
							}) }, item.menuItem.id)),
							/* @__PURE__ */ jsxs("div", {
								className: "border-t border-stone-300 mt-3 pt-3 flex justify-between font-bold text-lg",
								children: [
									/* @__PURE__ */ jsx("span", { children: "Итого:" }),
									/* @__PURE__ */ jsxs("span", {
										className: "text-copper-700",
										children: [totalAmount, " ₽"]
									}),
									" "
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: isProcessing,
						className: "w-full py-4 text-lg",
						children: [isProcessing ? "Обработка платежа..." : "Оплатить заказ", " "]
					})
				]
			}),
			/* @__PURE__ */ jsx(Modal, {
				isOpen: isModalOpen,
				onClose: handleCloseModal,
				title: "Заказ оформлен!",
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-center py-4",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "text-lg text-stone-700 mb-2",
							children: [
								"Спасибо, ",
								name,
								"! "
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-stone-500 mb-6",
							children: [
								"Ваш заказ на сумму ",
								totalAmount,
								" ₽ принят. ",
								"Мы свяжемся с вами по телефону ",
								phone,
								". "
							]
						}),
						/* @__PURE__ */ jsx(Button, {
							onClick: handleCloseModal,
							className: "w-full",
							children: "На главную"
						})
					]
				})
			})
		]
	});
});
//#endregion
//#region app/routes/about.tsx
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => about_default,
	meta: () => meta
});
var restaurantImage = new URL("../assets/restr.jpg", import.meta.url).href;
function meta() {
	return [{ title: "О нас | Ресторан" }];
}
var about_default = UNSAFE_withComponentProps(function AboutPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto space-y-8",
		children: [
			" ",
			/* @__PURE__ */ jsxs("section", {
				className: "bg-copper-50 rounded-3xl p-8 shadow-sm",
				children: [
					" ",
					/* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold text-copper-900 mb-4",
						children: "О нас"
					}),
					" ",
					/* @__PURE__ */ jsxs("p", {
						className: "text-lg text-copper-700 leading-relaxed",
						children: ["Наш ресторан — это место с уютной атмосферой и современной европейской кухней. ", "Мы готовим блюда из свежих продуктов, уделяем внимание качеству и создаём тёплую обстановку для гостей."]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "grid gap-6 md:grid-cols-2",
				children: [
					" ",
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white p-8 shadow-sm",
						children: [
							" ",
							/* @__PURE__ */ jsx("h2", {
								className: "text-2xl font-semibold text-copper-900 mb-3",
								children: "Наши преимущества"
							}),
							" ",
							/* @__PURE__ */ jsxs("ul", {
								className: "space-y-3 text-copper-700",
								children: [
									" ",
									/* @__PURE__ */ jsx("li", { children: "Свежие ингредиенты и авторские рецепты" }),
									/* @__PURE__ */ jsx("li", { children: "Быстрое обслуживание и внимательный персонал" }),
									/* @__PURE__ */ jsx("li", { children: "Удобное расположение в центре города" }),
									/* @__PURE__ */ jsx("li", { children: "Уютный интерьер и вечерняя атмосфера" })
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-white p-8 shadow-sm flex items-center justify-center",
						children: [" ", /* @__PURE__ */ jsx("img", {
							src: restaurantImage,
							alt: "Ресторан Чикенбурбе",
							className: "w-full h-auto rounded-2xl object-cover"
						})]
					})
				]
			})
		]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-CS1t-VDD.js",
		"imports": ["/assets/jsx-runtime-Dd9_80CN.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/root-CDw0RuD8.js",
			"imports": [
				"/assets/jsx-runtime-Dd9_80CN.js",
				"/assets/restaurant-Dr8i5Is0.js",
				"/assets/useCart-B57LMZra.js"
			],
			"css": ["/assets/root-DRmyc1O_.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-qkk4N9xC.js",
			"imports": ["/assets/jsx-runtime-Dd9_80CN.js", "/assets/restaurant-Dr8i5Is0.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/menu": {
			"id": "routes/menu",
			"parentId": "root",
			"path": "menu",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/menu-wghiz5iw.js",
			"imports": ["/assets/jsx-runtime-Dd9_80CN.js", "/assets/useCart-B57LMZra.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/cart": {
			"id": "routes/cart",
			"parentId": "root",
			"path": "cart",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/cart-C_xLNpn5.js",
			"imports": ["/assets/jsx-runtime-Dd9_80CN.js", "/assets/useCart-B57LMZra.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/checkout": {
			"id": "routes/checkout",
			"parentId": "root",
			"path": "checkout",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/checkout-DtfH8Mhv.js",
			"imports": ["/assets/jsx-runtime-Dd9_80CN.js", "/assets/useCart-B57LMZra.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/about": {
			"id": "routes/about",
			"parentId": "root",
			"path": "about",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/about-BIQpbspz.js",
			"imports": ["/assets/jsx-runtime-Dd9_80CN.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-e818be2a.js",
	"version": "e818be2a",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build\\client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"v8_passThroughRequests": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/menu": {
		id: "routes/menu",
		parentId: "root",
		path: "menu",
		index: void 0,
		caseSensitive: void 0,
		module: menu_exports
	},
	"routes/cart": {
		id: "routes/cart",
		parentId: "root",
		path: "cart",
		index: void 0,
		caseSensitive: void 0,
		module: cart_exports
	},
	"routes/checkout": {
		id: "routes/checkout",
		parentId: "root",
		path: "checkout",
		index: void 0,
		caseSensitive: void 0,
		module: checkout_exports
	},
	"routes/about": {
		id: "routes/about",
		parentId: "root",
		path: "about",
		index: void 0,
		caseSensitive: void 0,
		module: about_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
