import "./Catalogue.css";
import ProductCard from "../ProductCard/ProductCard";
import MultiSelect from "../MultiSelect/MultiSelect";
import { getUniqueItems } from "../../utils/uniqueItems";
import { useEffect, useRef, useState } from "react";
import Video from "../Video/Video";
import AliceCarousel from "react-alice-carousel";
import { NavLink, useSearchParams } from "react-router-dom";

export default function Catalogue(props) {
  //#region Methods

  function selectColors(changedColor) {
    if (selectedColors.includes(changedColor)) {
      setColors(selectedColors.filter((el) => el !== changedColor));
    } else {
      setColors([...selectedColors, changedColor]);
    }
  }

  function filterItems()
  {
    setFilteredItems(
      props.items.filter((item) => (
        (selectedColors.length === 0 || selectedColors.includes(item.color))
      ))
    );
  }

  function slideNext(carousel)
  {
    console.log(carousel.current.state);
    const index = carousel.current.state.activeIndex;
    const itemsOnSlide = 5;
    if (index + 1 >= 
      carousel.current.state.transformationSet.length / itemsOnSlide) 
      return;

    carousel.current.slideNext();
  }

  function slidePrev(carousel)
  {
    carousel.current.slidePrev();
  }

  //#endregion

  //#region  Variables

  const colors = getUniqueItems(props.items.map((data) => data.color));
  const maxItemPrice = Math.max(...(props.items.map((data) => data.price)));
  
  const [recommended, setRecommended] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [selectedColors, setColors] = useState([]);
  const [minPrice, setMinPrice] = useState(false);
  const [maxPrice, setMaxPrice] = useState(false);

  const [filteredItems, setFilteredItems] = useState(props.items);
  useEffect(() => filterItems(),
    [selectedColors]
  );

  const items = filteredItems.map((data, i) => 
    <ProductCard
      data={data}
      key={`product-${i}`}
      addItem={props.addItem}
      likeItem={props.likeItem}
    />
  );
  const videos= props.videos.map((video, i) => 
    <Video
      data={video}
      key={`video-${i}`}
    />
  );
  const itemCarousel = useRef();
  const videoCarousel = useRef();

  const searchParams = useSearchParams();
  const filter = searchParams[0].get("filter");

  //#endregion

  return (
    <main className="catalogue">
      <h2 className="catalogue__title">Глаза</h2>
      <section className="catalogue__products">
        <div className="catalogue__filters">
          <form className="catalogue__filter-form">
            <label className="catalogue__label">
              Рекомендуемые
              <input className="catalogue__checkbox"
                type="checkbox"
                id="filter-recommended"
                onChange={(value) => setRecommended(value)}
              />
            </label>
            <label className="catalogue__label">
              Новинки
              <input className="catalogue__checkbox"
                type="checkbox"
                id="filter-new"
                onChange={(value) => setIsNew(value)}
              />
            </label>
            <label className="catalogue__label">
              Скидки
              <input className="catalogue__checkbox"
                type="checkbox"
                id="filter-discount"
                onChange={(value) => setDiscount(value)}
              />
            </label>
            <MultiSelect
              options={colors}
              onSelect={selectColors}
              title="Цвет"
            />
            <label className="catalogue__label">
              Цена от 
              <input className="catalogue__num-input"
                type="number"
                id="filter-min-price"
                min={0}
                onChange={(value) => setMinPrice(value)}
                placeholder="0"
              />
              до 
              <input className="catalogue__num-input"
                type="number"
                id="filter-max-price"
                min={0}
                onChange={(value) => setMaxPrice(value)}
                placeholder={maxItemPrice}
              />
            </label>
          </form>
        </div>
        <div className="catalogue__category">
          <h3 className="catalogue__subtitle">#лучшее</h3>
          <NavLink className="catalogue__more"
            to={`/items/gallery?filter=${filter}&type=items`}
          >
            Посмотреть всё
          </NavLink>
        </div>
        <div className="catalogue__gallery catalogue__gallery_scroll">
          <AliceCarousel
            items={items}
            paddingLeft={0}
            paddingRight={0}
            mouseTrackingresponsive={{
              0: {
                items: 2
              },
              600: {
                items: 3
              },
              900: {
                items: 4
              },
              1200: {
                items: 5
              }
            }}
            disableButtonsControls={true}
            ref={itemCarousel}
          />
          <button 
            className="catalogue__carousel-btn catalogue__carousel-btn_prev"
            type="button"
            onClick={() => slidePrev(itemCarousel)}
          />
          <button 
            className="catalogue__carousel-btn catalogue__carousel-btn_next"
            type="button"
            onClick={() => slideNext(itemCarousel)}
          />
        </div>
      </section>
      <section className="catalogue__reviews">
        <div className="catalogue__category">
          <h3 className="catalogue__subtitle">#тренды</h3>
          <NavLink className="catalogue__more"
            to={`/items/gallery?filter=${filter}&type=videos`}
          >
            Посмотреть всё
          </NavLink>
        </div>
        <div className="catalogue__videos">
          <AliceCarousel
            items={videos}
            paddingLeft={0}
            paddingRight={0}
            mouseTrackingresponsive={{
              0: {
                items: 2
              },
              600: {
                items: 3
              },
              900: {
                items: 4
              },
              1200: {
                items: 5
              }
            }}
            disableButtonsControls={true}
            ref={videoCarousel}
          />
          <button 
            className="catalogue__carousel-btn catalogue__carousel-btn_prev"
            type="button"
            onClick={() => slidePrev(videoCarousel)}
          />
          <button 
            className="catalogue__carousel-btn catalogue__carousel-btn_next"
            type="button"
            onClick={() => slideNext(videoCarousel)}
          /> 
        </div>
      </section>
    </main>
  );
}