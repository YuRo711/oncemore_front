import { NavLink } from "react-router-dom";
import logoutWhite from "../../images/logout white.svg";
import "./MobileMenu.css";

function MobileMenu(props) {
  function openLoginModal() {
    props.setMenuOpen(false);
    props.openLoginModal();
  }

  const { isLoggedIn } = props;

  return (
    <div className={`menu ${props.isMenuOpen ? " menu__opened" : ""}`}>
      <div className="menu__container">
        <div className="menu__header">
          <h1 className="header__logo">OnceMore</h1>
          <button
            className="menu__close-button"
            onClick={() => props.setMenuOpen(false)}
          />
        </div>
        <div className="menu__main">
          <nav className="menu__nav">
            <NavLink
              className="menu__link"
              to="/"
              onClick={() => props.setMenuOpen(false)}
            >
              Главная
            </NavLink>
            {
              props.categories.map((category, i) => (
                <NavLink className="menu__link"
                  to={`/items?filter=${category.filter}`}
                  key={`category-${i}`}
                >
                  {category.name}
                </NavLink>
              ))
            }
          </nav>
          {isLoggedIn ? (
            <button
              type="button"
              className="menu__button"
              onClick={() => {
                props.logOut();
                props.setMenuOpen(false);
              }}
            >
              Выход
            </button>
          ) : (
            <button
              type="button"
              className="menu__button"
              onClick={openLoginModal}
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
