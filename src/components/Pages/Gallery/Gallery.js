import { NavLink, useSearchParams } from "react-router-dom";
import "./Gallery.css";
import ProductCard from "../../ProductCard/ProductCard";
import Video from "../../Video/Video";

export default function Gallery(props) {
  const searchParams = useSearchParams();
  const filter = searchParams[0].get("filter");
  const type = searchParams[0].get("type");

  return (
    <main className="gallery">
      <div className="gallery__header">
        <NavLink className="gallery__link" 
          to={`/items?filter=foryou`}
        >
          Главная
        </NavLink>
        /
        <NavLink className="gallery__link" 
          to={`/items?filter=${filter}`}
        >
          Глаза
        </NavLink>
        /
        <span className="gallery__current">
          {type == "items" ? "Все товары" : "Все обзоры"}
        </span>
      </div>
      <div className="gallery__items">
        {
          type == "items" ?
          props.items.map((data, i) => 
            <ProductCard
              data={data}
              key={`product-${i}`}
              addItem={props.addItem}
              likeItem={props.likeItem}
              openLoginModal={props.openLoginModal}
              isLoggedIn={props.isLoggedIn}
            />
          ) 
          :
          props.videos.map((video, i) => 
            <Video
              data={video}
              key={`video-${i}`}
              getProduct={props.getProduct}
            />
          )
        }
      </div>
    </main>
  );
}