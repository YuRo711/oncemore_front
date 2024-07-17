import { NavLink } from "react-router-dom";
import play from "../../images/play.svg";
import "./Video.css";
import {parseViews} from "../../utils/parsers";
import { useEffect, useState } from "react";

export default function Video(props) {
  const { link, productId, views, id } = props.data;
  const parsedViews = parseViews(views);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    props.getProduct((productId))
      .then((product) => setProductData(product));
  }, [])

  if (!productData) return;

  return (
    <NavLink className={`video ${props.isSmall ? "video_small" : ""}`}
      to={`/review?id=${id}`}
    >
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
        <h4 className="video__title">{productData.name}</h4>
        <h5 className="video__price">{productData.price}₽</h5>
      </div>
    </NavLink>
  );
}