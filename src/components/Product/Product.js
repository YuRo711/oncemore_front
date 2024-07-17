import "./Product.css";
import { useContext, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import Video from "../Video/Video";
import { UserContext } from "../../contexts/UserContext";

export default function Product(props) {
  //#region Methods

  function nextImage() {
    const newNum = (currentImageNum + 1) % images.length;
    setCurrentImageNum(newNum);
    setCurrentImage(images[newNum]);
  }

  function prevImage() {
    const newNum = currentImageNum > 0 ? 
      currentImageNum - 1 :
      images.length - 1;
    setCurrentImageNum(newNum);
    setCurrentImage(images[newNum]);
  }

  function selectImage(i) {
    setCurrentImageNum(i);
    setCurrentImage(images[i]);
  }

  function toggleDetails() {
    setDetailsOpen(!detailsOpen);
  }

  function toggleLike(e) {
    if (!props.isLoggedIn) {
      props.openLoginModal();
      return;
    }
    
    props.likeItem(e, id);
    setIsLiked(!isLiked);
  }

  //#endregion
  
  //#region Variables

  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
  const data = props.items
    .filter((item) => item.id == id)[0];
  const { name, price, color, images, likes } = data;

  const [currentImageNum, setCurrentImageNum] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[currentImageNum]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const areButtonsDisabled = images.length < 2;

  const videos = props.videos.filter((vid) => vid.productId == id);
  const sameItems = props.items.filter((item) => item.name == name);
  const colorImages = sameItems.map((item) => item.colorImage);

  const userId = useContext(UserContext).user.id;
  const [isLiked, setIsLiked] = useState(likes.includes(userId));

  //#endregion

  //#region Rendering

  return (
    <main className="product">
      <div className="product__page">
        <div className="product__images">
            <div className="product__gallery">
              {
                images.map((img, i) => (
                  <img className="product__image"
                    key={`image-${i}`}
                    src={img}
                    onClick={() => selectImage(i)}
                  />)
              )
              }
            </div>
            <div className="product__current-image">
              <img className="product__main-image"
                src={currentImage}
                alt={name}
              />
              <button className=
                "product__image-button product__image-button_left"
                onClick={prevImage}
                disabled={areButtonsDisabled}
              />
              <button className=
                "product__image-button product__image-button_right"
                onClick={nextImage}
                disabled={areButtonsDisabled}
              />
            </div>
        </div>
        <div className="product__info">
          <div className="product__main">
            <div className="product__title">
              <h2 className="product__name">{name}</h2>
              <h3 className="product__price">{price}₽</h3>
            </div>
            <div className="product__color-choice">
              <p className="product__text">
                <span className="product__quality">Цвет: </span>
                {color}
              </p>
              <div className="product__colors">
                {
                  colorImages.map((img, i) => 
                    <NavLink to={`/item?id=${sameItems[i].id}`}
                      key={`color-${i}`}
                    >
                      <img 
                        className={`product__color ${
                          sameItems[i].id == id ? "product__color_selected" : ""
                        }`}
                        src={img}
                      />
                    </NavLink>
                  )
                }
              </div>
            </div>
            <div className="product__buttons">
              <button className="product__cart-button"
                type="button"
                onClick={() => props.addItem(id)}
              >
                Добавить в корзину
              </button>
              <button className={`product__like-button 
                ${isLiked ? "product__like-button_active" : ""}`}
                onClick={toggleLike}
              />
            </div>
          </div>
          <div className="product__details">
            <div className="product__details-header">
              О товаре
              <button className={`product__more-button 
                product__more-button_${detailsOpen ? "minus" : "plus"}`}
                onClick={toggleDetails}
              />
            </div>
            <p className={`product__details-text
                ${detailsOpen ? "product__details-text_visible" : ""}`}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
      <div className="product__reviews">
        <h3 className="product__subtitle">Обзоры этого товара</h3>
        <div className="product__videos">
          {
            videos.map((video, i) => 
              <Video
                data={video}
                key={`video-${i}`}
              />
            )
          }
        </div>
      </div>
    </main>
  );

  //#endregion
}