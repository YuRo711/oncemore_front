import vk from "../images/VK.svg";
import tg from "../images/Telegram.svg";
import whatsapp from "../images/WhatsApp.svg";
import yt from "../images/YouTube.svg";
import pinterest from "../images/Pinterest.svg";


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

export {
  categories,
  contacts
};