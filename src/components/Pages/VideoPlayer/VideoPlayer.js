import { NavLink, useSearchParams } from "react-router-dom";
import "./VideoPlayer.css";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { useContext, useEffect, useState } from "react";
import {parseViews} from "../../../utils/parsers";
import playIcon from "../../../images/play.svg";
import Video from "../../Video/Video";
import ProductCard from "../../ProductCard/ProductCard";
import Review from "../../Review/Review";
import { UserContext } from "../../../contexts/UserContext";

export default function VideoPlayer(props) {
  function goBack() {

  }

  //#region Variables

  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
  const data = props.videos
    .filter((video) => video.id == id)[0];
  const { link, productId, author, views, tags, reviewText } = data;
  const parsedViews = parseViews(views);
  const videos = props.videos.filter((vid) => vid.productId == productId);
  const Profile = props. videos.filter((vid) => vid.author == author)

  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    props.getUser((author))
      .then((user) => setUserData(user));
    props.getProduct((productId))
      .then((product) => setProductData(product));
  }, []);

  const isAdmin = useContext(UserContext).user.privilege >= 1;

  //#endregion

  //#region Rendering
  if (!userData || !productData) return;

  return (
    <main className="player">
      <div className="player__main">
        <video className="player__video"
          src={link}
          autoPlay
        />
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
        <div className="player__video-info">
          <div className="player__user">
            <UserAvatar
              userData={userData}
            >
              <button className="avatar__user-button"/>
            </UserAvatar>
            <div className="player__author">
              @{userData.handle}
            </div>
            <div className="player__tags">
              {
                tags.map((tag, i) => 
                  <p className="player__tag" key={`tag-${i}`}>#{tag}</p>
              )
              }
            </div>
          </div>
          <div className="player__views">
            <img className="player__views-icon"
              src={playIcon}
            />
            {parsedViews}
          </div>
          <div className="player__arrows">
            <button 
              className="player__video-button player__video-button_up"
            />
            <button 
              className="player__video-button player__video-button_down"
            />
          </div>
          <button 
            className="player__video-button player__video-button_share"
            onClick={props.openShareModal}
          />
        </div>
        <button 
          className="player__video-button player__video-button_close"
          onClick={goBack}
        />
      </div>
      <div className="player__products">
        {
          isAdmin ?
          <div className="player__admin">
            <button className="player__admin-button"
              onClick={() => props.deleteReview(data)}
            >
              Удалить видео
            </button>
            <button className="player__admin-button"
              onClick={() => props.blockUser(userData)}
            >
              Заблокировать пользователя
            </button>
          </div>
          : ""
        }
        <h2 className="player__review-title">
          Обзор продукта {productData.name} от пользователя {userData.name}
        </h2>
          <div className="player__category">
            <div className="player__category-header">
              <h3 className="player__subtitle">
                Другие обзоры
              </h3>
              <NavLink className="catalogue__more"
                to={`/items/gallery?filter=${""}&type=videos`}
              >
                Посмотреть всё
              </NavLink>
            </div>
            <h3 className="player__subtitle">
              <div className="player__gallery">
                {
                  videos.map((video, i) => 
                    <Video
                      isSmall={true}
                      data={video}
                      key={`video-${i}`}
                      getProduct={props.getProduct}
                    />
                  )
                }
              </div>
            </h3>
        </div>
        <div className="player__category">
          <div className="player__category-header">
            <h3 className="player__subtitle">
              Похожие товары
            </h3>
            <NavLink className="catalogue__more"
              to={`/items/gallery?filter=${""}&type=items`}
            >
              Посмотреть всё
            </NavLink>
          </div>
            <div className="player__gallery">
              {
                props.items.map((data, i) => 
                  <ProductCard
                    isSmall={true}
                    data={data}
                    key={`product-${i}`}
                  />
                )
              }
            </div>
        </div>
        {
          !reviewText ? "" :
          <div className="player__review">
            <h3 className="player__subtitle">
              Что {userData.name} говорит о {productData.name}
            </h3>
            <Review 
              author={userData}
              videoData={data}
            />
          </div>
        }
        <div className="player__category">
          <div className="player__category-header">
            <h3 className="player__subtitle">
              Обзоры пользователя {userData.name}
            </h3>
            <NavLink className="catalogue__more"
              to={`/items/gallery?filter=${""}&type=videos`}
            >
              Посмотреть всё
            </NavLink>
          </div>
            <div className="player__gallery">
              {
                Profile.map((video, i) => 
                  <Video
                    isSmall={true}
                    data={video}
                    key={`video-${i}`}
                    getProduct={props.getProduct}
                  />
                )
              }
            </div>
        </div>
      </div>
    </main>
  );

  //#endregion
}