import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.css";
import liked from "../../images/icon _heart.svg";
import cart from "../../images/icon _shopping cart.svg";

export default function Header(props) {
  return (
    <header className="header">
      {props.isOnMobile ? (
        <button
          className={
            "header__menu-button"
          }
          onClick={() => props.setMenuOpen(true)}
        />
      ) : 
      (
      <div className="header__top">
        <h1 className="header__logo">OnceMore</h1>
        <Search/>
        <nav className="header__menu">
          {props.isLoggedIn ? 
          (
            <div className="header__links">
              <NavLink className="header__link" to="/orders">
                Заказы
              </NavLink>
              <NavLink className="header__link" to="/points">
                Баллы
              </NavLink>
            </div>
          ) : (
            <div className="header__links">
              <button className="header__button"
                onClick={() => props.handleModalOpen("login")}
              >
                Вход
              </button>
            </div>            
          )}
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
      )}

      {/* <div className="header__categories">
          {
            props.categories.map((category) => (
              <NavLink className="header__category"
                to={`/items?filter=${category.filter}`}
              >
                {category.name}
              </NavLink>
            ))
          }
      </div> */}
    </header>
  );
}