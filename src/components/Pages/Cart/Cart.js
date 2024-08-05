import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartContext } from "../../../contexts/CartContext";
import backIcon from "../../../images/caret-left.svg";
import HorizontalItem from "../../HorizontalItem/HorizontalItem";
import { useNavigate } from "react-router";

export default function Cart(props) {
  function conjugateItem(n) {
    if (n % 10 === 1) 
      return "предмет";
    if (n % 10 > 1 && n % 10 < 5) 
      return "предмета";
    return "предметов";
  }

  function addToTotal(price) {
    setItemTotal(itemTotal + price);
  }


  const items = useContext(CartContext).cart;
  const [itemTotal, setItemTotal] = useState(0);
  const delivery = 100;
  const tax = 0;
  const discount = -51;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(itemTotal + delivery + tax + discount);
  }, [itemTotal]);

  const navigate = useNavigate();


  return <main className="cart">
    <div className="cart__header">
      <button class="cart__back"
        onClick={() => navigate(-1)}
      >
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
            <HorizontalItem
              data={item}
              key={`cart-item-${i}`}
              isCart={true}
              likeItem={props.likeItem}
              addToTotal={addToTotal}
            />
          )
        }
      </div>
      <div className="cart__summary">
        <div className="cart__costs">
          <div className="cart__cost">
            Стоимость товаров
            <span className="cart__price">{itemTotal}₽</span>
          </div>
          <div className="cart__cost">
            Доставка
            <span className="cart__price">{delivery}₽</span>
          </div>
          <div className="cart__cost">
            Налог
            <span className="cart__price">{tax}₽</span>
          </div>
          <div className="cart__cost cart__cost_discount">
            Скидка
            <span className="cart__price cart__price_discount">
              {discount}₽
            </span>
          </div>
        </div>
        <div className="cart__total">
          Итого
          <span className="cart__total-cost">{total}₽</span>
        </div>
        <button className="cart__checkout-button"
          type="button"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </main>
}