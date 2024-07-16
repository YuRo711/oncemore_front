import "./Catalogue.css";
import ProductCard from "../ProductCard/ProductCard";
import MultiSelect from "../MultiSelect/MultiSelect";
import { getUniqueItems } from "../../utils/uniqueItems";
import { useEffect, useState } from "react";
import Video from "../Video/Video";

export default function Catalogue(props) {
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
        <div className="catalogue__gallery">
          {
            filteredItems.map((data, i) => 
              <ProductCard
                data={data}
                key={`product-${i}`}
              />
            )
          }
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