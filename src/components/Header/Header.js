import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.css";
import liked from "../../images/icon _heart.svg";
import cart from "../../images/icon _shopping cart.svg";
import { categories } from "../../utils/constants";

export default function Header(props) {
  return (
    <div className="header">
      <div className="header__top">
        <img className="header__logo"
          src="#"
          alt="Once More Cosmetics"
        />
        <Search/>
        <nav className="header__menu">
          <NavLink className="header__link" to="/login">
            Вход
          </NavLink>
          <NavLink className="header__link" to="/orders">
            Заказы
          </NavLink>
          <NavLink className="header__link" to="/points">
            Баллы
          </NavLink>
          <NavLink className="header__link" to="/liked">
            <img className="header__icon"
              src={liked}
              alt="liked"
            />
          </NavLink>
          <NavLink className="header__link" to="/cart">
            <img className="header__icon"
              src={cart}
              alt="cart"
            />
          </NavLink>
        </nav>
      </div>

      <div className="header__categories">
          {
            categories.map((category) => (
              <NavLink className="header__category"
                to={`/items?filter=${category.filter}`}
              >
                {category.name}
              </NavLink>
            ))
          }
      </div>
    </div>
  );
}