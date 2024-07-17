import { useContext } from "react";
import "./Liked.css";
import { UserContext } from "../../contexts/UserContext";
import HorizontalItem from "../HorizontalItem/HorizontalItem";

export default function Liked(props) {
  const user = useContext(UserContext).user;
  const items = props.items.filter(
    (item) => item.likes.includes(user.id));

  if (!props.isLoggedIn || !user) {
    return (
      <main className="liked">
        <h2 className="liked__register">
          <button className="liked__signup-button"
            onClick={props.openSignUp}
          >
            Зарегистрируйтесь
          </button>
          , чтобы сохранять товары и участвовать в сообществе OnceMore!
        </h2>
      </main>
    );
  }

  return (
    <main className="liked">
      <div className="liked__items">
        {
          items.map((item, i) => 
            <HorizontalItem
              data={item}
              key={`cart-item-${i}`}
              isCart={false}
            />
          )
        }
      </div>
    </main>
  );
}