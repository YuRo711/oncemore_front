import { NavLink, useSearchParams } from "react-router-dom";
import "./Gallery.css";

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
    </main>
  );
}