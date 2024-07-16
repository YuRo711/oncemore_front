import { useContext } from "react";
import "./Liked.css";
import { UserContext } from "../../contexts/UserContext";

export default function Liked(props) {
  const user = useContext(UserContext).user;

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
      
    </main>
  );
}