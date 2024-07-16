import { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../../contexts/CartContext";
import backIcon from "../../images/caret-left.svg";
import CartItem from "../CartItem/CartItem";

export default function Cart(props) {
  function conjugateItem(n) {
    if (n % 10 === 1) 
      return "предмет";
    if (n % 10 > 1 && n % 10 < 5) 
      return "предмета";
    return "предметов";
  }

  const items = useContext(CartContext).cart;

  return <main className="cart">
    <div className="cart__header">
      <button class="cart__back">
        <img class="cart__back-icon"
          src={backIcon}
        />
        Назад
      </button>
      <h1 className="cart__title">Корзина</h1>
    </div>
    <div className="cart__main">
      <div className="cart__items">
        <div className="cart__items-header">
          <p className="cart__text">
            В корзине {items.length} {conjugateItem(items.length)}
          </p>
          <button className="cart__clear"
            type="button"
            onClick={props.clearCart}
          >
            Очистить корзину
          </button>
        </div>
        {
          items.map((item, i) => 
            <CartItem
              data={item}
              key={`cart-item-${i}`}
            />
          )
        }
      </div>
    </div>
  </main>
}