import "./Product.css";
import image1 from "../../images/canvas 2.png";
import image2 from "../../images/canvas.png";
import brown from "../../images/Screenshot from 2024-07-11 19-46-27.png";
import blue from "../../images/Screenshot from 2024-07-11 19-46-31.png";
import { useState } from "react";

export default function Product(props) {
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

  function selectColor(i)
  {
    setColor(colors[i]);
    setColorNum(i);
  }
  

  const name = "Карандаш для глаз";
  const price = "300₽"
  const images = [image1, image2];
  const [currentImageNum, setCurrentImageNum] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[currentImageNum]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const colors = ["коричневый", "синий"];
  const colorImages = [brown, blue];
  const [colorNum, setColorNum] = useState(0);
  const [color, setColor] = useState(colors[0]);


  return (
    <main className="product">
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
            />
            <button className=
              "product__image-button product__image-button_right"
              onClick={nextImage}
            />
          </div>
      </div>
      <div className="product__info">
        <div className="product__main">
          <div className="product__title">
            <h2 className="product__name">{name}</h2>
            <h3 className="product__price">{price}</h3>
          </div>
          <div className="product__color-choice">
            <p className="product__text">
              <span className="product__quality">Цвет: </span>
              {color}
            </p>
            <div className="product__colors">
              {
                colorImages.map((img, i) => 
                  <img 
                    className={`product__color ${
                      colorNum == i ? "product__color_selected" : ""
                    }`}
                    src={img}
                    key={`color-${i}`}
                    onClick={() => selectColor(i)}
                  />
                )
              }
            </div>
          </div>
          <div className="product__buttons">
            <button className="product__cart-button">
              Добавить в корзину
            </button>
            <button className="product__like-button"/>
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
    </main>
  );
}