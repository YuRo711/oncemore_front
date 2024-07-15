import { useSearchParams } from "react-router-dom";
import "./VideoPlayer.css";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useEffect, useState } from "react";
import {parseViews} from "../../utils/parsers";
import playIcon from "../../images/play.svg";

export default function VideoPlayer(props) {
  //#region Variables

  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
  const data = props.videos
    .filter((video) => video.id == id)[0];
  const { link, productId, price, author, views, tags } = data;
  const parsedViews = parseViews(views);

  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    props.getUser((author))
      .then((user) => setUserData(user));
    props.getProduct((productId))
      .then((product) => setProductData(product));
    console.log(productData);
  }, [])

  //#endregion

  //#region Rendering

  return (
    <main className="player">
      <div className="player__main">
        <video className="player__video"
          src={link}
          autoPlay
        />
        {
          productData ? 
            <div className="player__product">
              <img className="player__product-image"
                src={productData.images[0]}
              />
              <div className="player__product-info">
                <h4 className="player__price">{productData.price}₽</h4>
                <h3 className="player__title">{productData.name}</h3>
              </div>
              <button className="player__cart-button" 
                type="button"
              />
            </div>
          : ""
        }
        <div className="player__video-info">
          {
            userData ?
            <div className="player__user">
              <UserAvatar
                userData={userData}
              >
                <button className="player__user-button"/>
              </UserAvatar>
              <div className="player__author">
                @{userData.name}
              </div>
              <div className="player__tags">
                {
                  tags.map((tag) => 
                    <p className="player__tag">#{tag}</p>
                )
                }
              </div>
            </div>
            : ""
          }
          <div className="player__views">
            <img className="player__views-icon"
              src={playIcon}
            />
            {parsedViews}
          </div>
        </div>
      </div>
    </main>
  );

  //#endregion
}