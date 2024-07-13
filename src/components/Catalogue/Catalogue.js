import "./Catalogue.css";
import ProductCard from "../ProductCard/ProductCard";
import MultiSelect from "../MultiSelect/MultiSelect";
import { getUniqueItems } from "../../utils/uniqueItems";
import { useState } from "react";

export default function Catalogue(props) {
  function selectColors() {

  }

  const colors = getUniqueItems(props.items.map((data) => data.color));
  const maxItemPrice = Math.max(...(props.items.map((data) => data.price)));
  
  const [recommended, setRecommended] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [selectedColors, setColors] = useState([]);
  const [minPrice, setMinPrice] = useState(false);
  const [maxPrice, setMaxPrice] = useState(false);

  const filteredItems = props.items;

  return (
    <main className="catalogue">
      <h2 className="catalogue__title">Глаза</h2>
      <div className="catalogue__products">
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
              colors={colors}
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
            props.items.map((data, i) => 
              <ProductCard
                data={data}
                key={`product-${i}`}
              />
            )
          }
        </div>
      </div>
    </main>
  );
}