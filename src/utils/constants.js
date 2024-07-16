import vk from "../images/VK.svg";
import tg from "../images/Telegram.svg";
import whatsapp from "../images/WhatsApp.svg";
import yt from "../images/YouTube.svg";
import pinterest from "../images/Pinterest.svg";
import item1 from "../images/canvas.png";
import item2 from "../images/canvas 2.png";
import brown from "../images/Screenshot from 2024-07-11 19-46-27.png";
import blue from "../images/Screenshot from 2024-07-11 19-46-31.png";
import banner2 from "../temp/banner 2.png"


const categories = [
  {
    name: "Для Вас",
    filter: "foryou"
  },
  {
    name: "Новинки",
    filter: "new"
  },
  {
    name: "Глаза",
    filter: "eyes"
  },
  {
    name: "Губы",
    filter: "lips"
  },
  {
    name: "Брови",
    filter: "eyebrows"
  },
];

const contacts = [
  {
    icon: vk,
    link: "#"
  },
  {
    icon: tg,
    link: "#"
  },
  {
    icon: whatsapp,
    link: "#"
  },
  {
    icon: yt,
    link: "#"
  },
  {
    icon: pinterest,
    link: "#"
  },
]

const products = [
  {
    name: "Карандаш для глаз",
    price: 300,
    color: "коричневый",
    colorImage: brown,
    id: 0,
    images: [item1, item2],
  },
  {
    image: item1,
    name: "Карандаш для глаз",
    price: 300,
    color: "синий",
    colorImage: blue,
    id: 1,
    images: [item1],
  },
  {
    image: item2,
    name: "Карандаш для глаз",
    price: 300,
    color: "коричневый",
    colorImage: brown,
    id: 2,
    images: [item1, item2],
  },
  {
    image: item1,
    name: "Карандаш для глаз",
    price: 300,
    color: "синий",
    colorImage: blue,
    id: 3,
    images: [item1, item2],
  },
  {
    image: item2,
    name: "Карандаш для глаз",
    price: 300,
    color: "коричневый",
    colorImage: brown,
    id: 4,
    images: [item1, item2],
  },
  {
    image: item1,
    name: "Карандаш для глаз",
    price: 300,
    color: "синий",
    colorImage: blue,
    id: 5,
    images: [item1, item2],
  },
];

var banners = [
  {
    title: "OnceMore",
    subtitle: "Это будет здорово",
    paragraphs: [
      "Добро пожаловать на обратную сторону шоппинга.",
      "Шоппинг – это не просто покупка, это общение.",
      "Не молчите: расскажите о своих покупках, создавайте сюжеты, обсуждайте покупки с реальными людьми.",
      "Получайте вознаграждения, участвуя в обсуждениях, делясь своими историями и слушая других людей.",
      "Воспользуйтесь удобным сервисом: оформлением заказа, доставкой, онлайн-поддержкой.",
      "Шоппинг – это разговор, а покупка – новая история.",
      "Это будет здорово.",
    ]
  },
  {
    title: "Получайте баллы за покупки и отзывы о товаре",
    subtitle: "Чем реальнее и честнее будут Ваши отзывы, тем больше Покупатели будут доверять тому, что видят.",
    paragraphs: [
      "1.  Создавайте видео-отзывы о плюсах и минусах товара.",
      "2. Оценивайте отзывы других людей.",
      "3. Приглашайте своих друзей.",
    ],
    image: banner2
  },
]

export {
  categories,
  contacts,
  products,
  banners,
};