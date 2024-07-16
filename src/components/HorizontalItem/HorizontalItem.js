import { NavLink } from "react-router-dom";
import "./HorizontalItem.css";

export default function HorizontalItem(props) {
  const { images, name, price, color, id } = props.data;
  const { isCart } = props;

  return (
    <NavLink className="cart-item" to={`/item?id=${id}`}>
      <div className="cart-item__main">
        <img className="cart-item__image"
          src={images[0]}
          alt={name}
        />
        <div className="cart-item__info">
          <h3 className="cart-item__title">{name}</h3>
          <p className="cart-item__property">Цвет: {color}</p>
        </div>
        <h4 className="cart-item__price">{price}₽</h4>
      </div>
      <div className="cart-item__buttons">
        <button className="cart-item__text-button"
          type="button"
        >
          Удалить
        </button>
        <button className="cart-item__text-button"
          type="button"
        >
          {isCart ? "Сохранить" : "В корзину"}
        </button>
        {isCart ? 
          <div className="cart-item__number">
            <button 
              className="cart-item__num-button cart-item__num-button_minus"
              type="button"
            />
            1
            <button 
              className="cart-item__num-button cart-item__num-button_plus"
              type="button"
            />
          </div>
          : ""
        }
      </div>
    </NavLink>
  );
}