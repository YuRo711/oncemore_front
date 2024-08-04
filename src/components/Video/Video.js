import { NavLink } from "react-router-dom";
import play from "../../images/play.svg";
import "./Video.css";
import {parseViews} from "../../utils/parsers";
import { useEffect, useState } from "react";

export default function Video(props) {
  const { video, views, product, _id } = props.data;
  if (video.includes("watch?v=")) {
    video = video.replace("watch?v=", "embed/");
  }

  const parsedViews = parseViews(views);
  const [productData, setProductData] = useState(props.getProduct(product));

  if (!productData) return;

  return (
    <NavLink className={`video ${props.isSmall ? "video_small" : ""}`}
      to={`/review?id=${_id}`}
    >
      <div className="video__container">
        <iframe className="video__vid"
          src={video}
          muted
          // onMouseOver={event => event.target.play()}
          // onMouseOut={event => event.target.pause()}
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