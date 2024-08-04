import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "./VideoPlayer.css";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { useContext, useEffect, useState } from "react";
import {parseViews} from "../../../utils/parsers";
import playIcon from "../../../images/play.svg";
import Video from "../../Video/Video";
import ProductCard from "../../ProductCard/ProductCard";
import Review from "../../Review/Review";
import { UserContext } from "../../../contexts/UserContext";
import Comments from "../../Comments/Comments";

export default function VideoPlayer(props) {
  //#region Methods

  function nextVideo()
  {
    if (index >= props.videos.length - 1) {
      return;
    }

    setIndex(index + 1);
  }

  function prevVideo()
  {
    if (index == 0) {
      return;
    }

    setIndex(index - 1);
  }

  //#endregion


  //#region Variables

  const navigate = useNavigate();

  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");

  const [data, setData] = useState({});
  const [index, setIndex] = useState(props.videos.indexOf(data));

  const [parsedViews, setParsedViews] = useState("");
  const [videos, setVideos] = useState([]);
  const [profile, setProfile] = useState({});

  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);

  const [comments, setComments] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(null);

  useEffect(() => {
      if (!props.videos || props.videos.length == 0) return;

      setData(props.videos
        .find((video) => video._id == id));
    },
  [props.videos]);

  useEffect(() => {
    if (!data.product) return;

    setProductData(props.getProduct(data.product));
    props.getUser(data.author)
      .then((res) => setUserData(res.data));
    setVideos(props.videos.filter((vid) => vid.product == data.product));
    setProfile(props.videos.filter((vid) => vid.author == data.author));
  }, [data]);

  // useEffect(() => {
  //   setData(props.videos[index]);
  //   const _id = props.videos[index].id;

  //   props.getUser(author)
  //     .then((user) => setUserData(user));

  //     setProductData(props.getProduct(product));

  //   props.getComments(data._id)
  //     .then((commentData) => setComments(commentData));
  // }, [index]);

  useEffect(() => {
    props.addView(data._id);
  }, []);

  const isAdmin = useContext(UserContext).user.privilege >= 1;

  //#endregion


  //#region Rendering
  if (!userData || !productData || !data) return;

  return (
    <main className="player">
      <div className="player__main">
        <iframe className="player__video"
          src={data.video}
        />
        <div className="player__product">
          <img className="player__product-image"
            src={productData.photos[0]}
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
              {userData.handle}
            </div>
            <div className="player__tags">
              {
                // tags.map((tag, i) => 
                //   <p className="player__tag" key={`tag-${i}`}>#{tag}</p>
                // )
              }
            </div>
          </div>
          <div className="player__views">
            <img className="player__views-icon"
              src={playIcon}
            />
            {parsedViews ? parsedViews : 0}
          </div>
          <div className="player__arrows">
            <button 
              className="player__video-button player__video-button_up"
              onClick={prevVideo}
            />
            <button 
              className="player__video-button player__video-button_down"
              onClick={nextVideo}
            />
          </div>
          <button 
            className="player__video-button player__video-button_comment"
            onClick={() => setCommentsOpen(!commentsOpen)}
          />
          <button 
            className="player__video-button player__video-button_share"
            onClick={props.openShareModal}
          />
        </div>
        <button 
          className="player__video-button player__video-button_close"
          onClick={() => navigate(-1)}
        />
        {
          commentsOpen ? 
          <Comments
            comments={comments}
            getUser={props.getUser}
            setCommentsOpen={setCommentsOpen}
            deleteComment={props.deleteComment}
            sendComment={props.sendComment}
            videoId={data.id}
            likeComment={props.likeComment}
          />
          : ""
        }
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
          !data.text ? "" :
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
                profile.map((video, i) => 
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