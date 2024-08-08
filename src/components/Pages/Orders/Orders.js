import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import Order from "../../Order/Order";
import "./Orders.css";

export default function Orders(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    props.loadOrders()
      .then((res) => setOrders(res));
  }, []);

  return (
    <main className="orders">
      <h1 className="orders__title">Мои заказы</h1>
      <div className="orders__cards">
        {
          orders.map((order, i) => 
            <Order
              data={order}
              key={`myorder-${i}`}
            />
          )
        }
      </div>
    </main>
  );
}