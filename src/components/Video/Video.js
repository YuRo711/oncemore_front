import { NavLink } from "react-router-dom";
import "./Video.css";

export default function Video(props) {
  const { link, productName, price, views } = props.data;

  return (
    <div className="video">
      <div className="video__container">
        <video className="video__vid"
          src={link}
          onMouseOver={event => event.target.play()}
          onMouseOut={event => event.target.pause()}
        />
      </div>
      <div className="video__info">
        <h4 className="video__title">{productName}</h4>
        <h5 className="video__price">{price}₽</h5>
      </div>
    </div>
  );
}