import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer(props) {
  return (
    <footer className="footer">
      <img className="footer__logo"
        src="#"
        alt="Once More Cosmetics"
      />
      <div className="footer__info">
        <div className="footer__legal">
          <h2 className="footer__title">
            Юридическая информация
          </h2>
          <p className="footer__text">
          [вставьте юридическую информацию]
          </p>
        </div>
        <div className="footer__contacts">
          <h2 className="footer__title">
            Контакты
          </h2>
          <div className="footer__socials">
            {
              props.contacts.map((social) => (
                <NavLink className="footer__social-link" to={social.link}>
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