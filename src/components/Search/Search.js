import "./Search.css";
import icon from "../../images/search.svg";

export default function Search(props) {
  return (
    <div className="search">
      <form className="search__form">
        <input className="search__input"
          type="text"
          placeholder="Введите запрос..."
        />
        <img className="search__icon"
          src={icon}
        />
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
    </div>
  );
}