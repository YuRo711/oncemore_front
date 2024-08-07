import { useEffect, useState } from "react";
import "./Order.css";

export default function Order(props) {
  const {_id, date, items, quantity} = props.data;

  return (
    <div className="order">
      <h3 className="order__title">
        Заказ {_id}
      </h3>
      <p className="order__text">
        <span className="order__accent">Дата: </span>
        {date.split("T")[0]}
      </p>
      <div className="order__items">
      {
        items.map((item, i) => (
          <div className="order__item" key={`item-${i}`}>
            <img className="order__image"
              src={item.photos[0]}
            />
            <div className="order__item-info">
              <p className="order__text">
                <span className="order__accent">{item.name}</span>
              </p>
              <p className="order__text">
                <span className="order__accent">Цвет: </span>
                {item.color}
              </p>
              <p className="order__text">
                <span className="order__accent">Количество: </span>
                {quantity[i]}
              </p>
            </div>
            <p className="order__item-price">{item.price}₽</p>
          </div>
        ))
      }
      </div>
    </div>
  );
}