import vk from "../images/VK.svg";
import tg from "../images/Telegram.svg";
import whatsapp from "../images/WhatsApp.svg";
import yt from "../images/YouTube.svg";

const userLinks = [
  {
    name: "Профиль",
    link: "/me",
  },
  {
    name: "Заказы",
    link: "/orders",
  },
  {
    name: "Админка",
    link: "/admin",
  },
  {
    name: "Выход",
    link: "/logout",
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
]

const baseUrl = "http://127.0.0.1:3001";

export {
  contacts,
  userLinks,
  baseUrl,
};