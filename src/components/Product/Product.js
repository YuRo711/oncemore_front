import "./Product.css";
import image1 from "../../images/canvas 2.png";
import image2 from "../../images/canvas.png";
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

  const name = "Карандаш для глаз";
  const images = [image1, image2];
  const [currentImageNum, setCurrentImageNum] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[currentImageNum]);

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
          <div className="product__main">
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
        
      </div>
    </main>
  );
}