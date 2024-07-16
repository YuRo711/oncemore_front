import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.css";
import liked from "../../images/icon _heart.svg";
import cart from "../../images/icon _shopping cart.svg";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function Header(props) {

  const [currentPath, setCurrentPath] = useState("/");
  useEffect(() => setCurrentPath(window.location.pathname),
    [window.location]);
  const cartItemsNum = useContext(CartContext).cart.length;

  
  if (props.isOnMobile) {
    return(
      <header className="header">
        <button
          className={
            "header__menu-button"
          }
          onClick={() => props.setMenuOpen(true)}
        />
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__top">
        <NavLink className="header__link" to="/">
          <h1 className="header__logo">OnceMore</h1>
        </NavLink>
        <div className="header__dropdown">
          <DropdownMenu
            links={props.categories}
          />
        </div>
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
            {
              cartItemsNum == 0 ? "" :
              <div className="header__cart-num">{cartItemsNum}</div>
            }
          </NavLink>
        </nav>
      </div>
      {
        currentPath == "/review" ? "" :
        <div className="header__categories">
        {
          props.categories.map((category, i) => (
            <NavLink className="header__category"
              to={`/items?filter=${category.filter}`}
              key={`category-${i}`}
            >
              {category.name}
            </NavLink>
          ))
        }
        </div>
      }
    </header>
  );
}