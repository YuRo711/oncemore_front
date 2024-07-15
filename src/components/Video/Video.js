import { NavLink } from "react-router-dom";
import play from "../../images/play.svg";
import "./Video.css";
import {parseViews} from "../../utils/parsers";

export default function Video(props) {
  const { link, productName, price, views, id } = props.data;
  const parsedViews = parseViews(views);

  return (
    <NavLink className="video" to={`/review?id=${id}`}>
      <div className="video__container">
        <video className="video__vid"
          src={link}
          onMouseOver={event => event.target.play()}
          onMouseOut={event => event.target.pause()}
        />
        <div className="video__views">
          <img className="video__view-icon"
            src={play}
          />
          {parsedViews}
        </div>
        <button className="video__button"/>
      </div>
      <div className="video__info">
        <h4 className="video__title">{productName}</h4>
        <h5 className="video__price">{price}₽</h5>
      </div>
    </NavLink>
  );
}