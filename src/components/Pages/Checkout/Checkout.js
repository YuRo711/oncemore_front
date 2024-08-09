import { useContext, useEffect, useReducer, useRef, useState } from "react";
import "./Checkout.css";
import { CartContext } from "../../../contexts/CartContext";
import { UserContext } from "../../../contexts/UserContext";
import { FormValidator } from "../../../utils/FormValidator";

export default function Checkout(props) {
  function enableValidation() {
    const formElement = formRef.current;
    const newValidator = new FormValidator(formElement, setButtonActivity);
    newValidator.enableValidation();
    setValidator(newValidator);
  }

  function toggleButtonState() {
    validator.toggleButtonState();
  }


  const [isButtonActive, setButtonActivity] = useState(false);
  const [validator, setValidator] = useState(null);
  const totalPrice = localStorage.getItem("totalPrice");
  const user = useContext(UserContext).user;
  const formRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+7");

  useEffect(() => {
    if (!user) return;

    setEmail(user.email);
    setPhone(user.phone);
  }, [user])

  useEffect(() => {
    enableValidation();
  }, [])


  return (
    <main className="checkout">
      <form className="checkout__form" ref={formRef}>
        <label className="modal__label">
          <p className="modal__label-text checkout__label-text">ФИО</p>
          <input className="modal__input"
            type="text"
            placeholder="Ввведите ФИО..."
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              toggleButtonState();
            }}
          />
        </label>

        <label className="modal__label">
          <p className="modal__label-text checkout__label-text">Телефон</p>
          <input className="modal__input"
            type="tel"
            required
            value={phone}
            pattern="\+7[0-9]{10}"
            onChange={(e) => {
              setPhone(e.target.value);
              toggleButtonState();
            }}
          />
        </label>

        <label className="modal__label">
          <p className="modal__label-text checkout__label-text">E-mail</p>
          <input className="modal__input"
            type="email"
            placeholder="Ввведите e-mail..."
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              toggleButtonState();
            }}
          />
        </label>

        <button className="checkout__button"
          type="submit"
          disabled={!isButtonActive}
        >
          Продолжить
        </button>
      </form>
    </main>
  );
}