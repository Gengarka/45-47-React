// импорт типа menuItem из папки types для строгой типизации данных меню
import type { MenuItem } from "../types/index";

// массив с данными блюд ресторана, каждый объект соответствует интерфейсу `menuItem`
export const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Крем-суп из тыквы",
    description: "Нежный крем-суп из запечённой тыквы с имбирём и каплей кокосовых сливок",
    price: 320,
    category: "Закуски",
    image: new URL("../assets/soupPumpkin.jpeg", import.meta.url).href,
  },
  {
    id: 2,
    name: "Брускетта с ростбифом",
    description: "Хрустящая брускетта с тонкими ломтиками ростбифа, вялеными томатами и рукколой",
    price: 380,
    category: "Закуски",
    image: new URL("../assets/brusketta.jpg", import.meta.url).href,
  },
  {
    id: 3,
    name: "Стейк из лосося",
    description: "Сочный стейк из лосося на гриле с лимонным соусом и спаржей",
    price: 720,
    category: "Основные блюда",
    image: new URL("../assets/stakeLosos.jpg", import.meta.url).href,
  },
  {
    id: 4,
    name: "Паста карбонара",
    description: "Классическая итальянская паста с беконом, яичным желтком и пармезаном",
    price: 480,
    category: "Основные блюда",
    image: new URL("../assets/PastaKarbonara.jpg", import.meta.url).href,
  },
  {
    id: 5,
    name: "Утиная ножка конфы",
    description: "Медленно томлёная утиная ножка с карамелизированным луком и ягодным соусом",
    price: 650,
    category: "Основные блюда",
    image: new URL("../assets/duckLeg.jpg", import.meta.url).href,
  },
  {
    id: 6,
    name: "Тирамису",
    description: "Десерт на основе маскарпоне, кофе эспрессо и какао с нотками ванили",
    price: 290,
    category: "Десерты",
    image: new URL("../assets/tiranisu.jpg", import.meta.url).href,
  },
  {
    id: 7,
    name: "Облепиховый чай",
    description: "Согревающий чай из облепихи с мёдом, корицей и долькой апельсина",
    price: 180,
    category: "Напитки",
    image: new URL("../assets/oblepihaTea.jpg", import.meta.url).href,
  },
];