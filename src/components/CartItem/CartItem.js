import { NavLink } from "react-router-dom";
import "./CartItem.css";

export default function CartItem(props) {
  const { images, name, price, color, id } = props.data;

  return (
    <NavLink className="cart-item" to={`/item?id=${id}`}>
      <img className="cart-item__image"
        src={images[0]}
        alt={name}
      />
      <div className="cart-item__info">
        <h3 className="cart-item__title">{name}</h3>
      </div>
    </NavLink>
  );
}