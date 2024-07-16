import "./Catalogue.css";
import ProductCard from "../ProductCard/ProductCard";
import MultiSelect from "../MultiSelect/MultiSelect";
import { getUniqueItems } from "../../utils/uniqueItems";
import { useEffect, useRef, useState } from "react";
import Video from "../Video/Video";
import AliceCarousel from "react-alice-carousel";

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

  function slideNext()
  {
    const index = carousel.current.state.activeIndex;
    const itemsOnSlide = 5;
    if (index >= filteredItems.length / itemsOnSlide) return;

    console.log(index);
    carousel.current.slideNext();
  }

  function slidePrev()
  {
    console.log(carousel.current.state.activeIndex);
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
    />
  );
  const carousel = useRef();

  //#endregion

  return (
    <main className="catalogue">
      <h2 className="catalogue__title">Глаза</h2>
      <section className="catalogue__products">
        <h3 className="catalogue__subtitle">Товары</h3>
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
            ref={carousel}
          />
          <button 
            className="catalogue__carousel-btn catalogue__carousel-btn_prev"
            type="button"
            onClick={slidePrev}
          />
          <button 
            className="catalogue__carousel-btn catalogue__carousel-btn_next"
            type="button"
            onClick={slideNext}
          />
        </div>
      </section>
      <section className="catalogue__reviews">
        <h3 className="catalogue__subtitle">#тренды</h3>
        <div className="catalague__videos">
          {
            props.videos.map((video, i) => 
              <Video
                data={video}
                key={`video-${i}`}
              />
            )
          }
        </div>
      </section>
    </main>
  );
}