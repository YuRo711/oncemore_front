import { NavLink } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard(props) {
  const { images, name, price, color, id } = props.data;

  return (
    <NavLink className={`item ${props.isSmall ? "item_small" : ""}`}
      to={`/item?id=${id}`}
    >
      <div className="item__image-container">
        <img className="item__image"
          src={images[0]}
          alt={name}
        />
      </div>
      <h3 className="item__name">{name}</h3>
      <h4 className="item__price">{price}₽</h4>
      <button className="item__cart-button"
        type="button"
        onClick={(e) => props.addItem(e, id)}
      >
        В корзину
      </button>
      <button className="item__like-button"
        onClick={(e) => props.likeItem(e, id)}
      />
    </NavLink>
  );
}