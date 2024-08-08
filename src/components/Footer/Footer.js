import { NavLink, useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer(props) {
  const currentPath = useLocation().pathname;

  if (currentPath === "/review") return;

  return (
    <footer className="footer">
      <h2 className="footer__logo">OnceMore</h2>
      <div className="footer__info">
        <div className="footer__legal">
          <h2 className="footer__title">
            Юридическая информация
          </h2>
          <NavLink className="footer__link" to="/confidentiality">
            Политика конфиденциальности
          </NavLink>
          <NavLink className="footer__link" to="/personal-data">
            Политика обработки персональных данных
          </NavLink>
        </div>
        <div className="footer__contacts">
          <h2 className="footer__title">
            Контакты
          </h2>
          <div className="footer__socials">
            {
              props.contacts.map((social, i) => (
                <NavLink className="footer__social-link" 
                  to={social.link}
                  key={`social-${i}`}
                >
                  <img className="footer__social-icon"
                    src={social.icon}
                  />
                </NavLink>
              ))
            }
          </div>
        </div>
      </div>
    </footer>
  );
}