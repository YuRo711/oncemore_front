import { NavLink } from "react-router-dom";
import "./ProductCard.css";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function ProductCard(props) {
  function toggleLike(e) {
    if (!props.isLoggedIn) {
      props.openLoginModal();
      return;
    }

    props.likeItem(e, id);
    setIsLiked(!isLiked);
  }

  const { image, name, price, color, id, likes } = props.data;
  const userId = useContext(UserContext).user.id;
  const [isLiked, setIsLiked] = useState(likes.includes(userId));

  return (
    <NavLink className={`item ${props.isSmall ? "item_small" : ""}`}
      to={`/item?id=${id}`}
    >
      <div className="item__image-container">
        <img className="item__image"
          src={image}
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
      <button className={`item__like-button 
          ${isLiked ? "item__like-button_active" : ""}`}
        onClick={(e) => toggleLike(e)}
      />
    </NavLink>
  );
}