import vk from "../images/VK.svg";
import tg from "../images/Telegram.svg";
import whatsapp from "../images/WhatsApp.svg";
import yt from "../images/YouTube.svg";
import pinterest from "../images/Pinterest.svg";
import item1 from "../images/canvas.png";
import item2 from "../images/canvas 2.png";


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
    image: item1,
    name: "Карандаш для глаз",
    price: 300,
    color: "коричневый",
  },
  {
    image: item2,
    name: "Карандаш для глаз",
    price: 300,
    color: "синий",
  },
  {
    image: item1,
    name: "Карандаш для глаз",
    price: 300,
    color: "коричневый",
  },
  {
    image: item2,
    name: "Карандаш для глаз",
    price: 300,
    color: "синий",
  },
  {
    image: item1,
    name: "Карандаш для глаз",
    price: 300,
    color: "коричневый",
  },
  {
    image: item2,
    name: "Карандаш для глаз",
    price: 300,
    color: "синий",
  },
];

export {
  categories,
  contacts,
  products
};