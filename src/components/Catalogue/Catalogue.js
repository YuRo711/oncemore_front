import "./Catalogue.css";
import ProductCard from "../ProductCard/ProductCard";
import { getUniqueItems } from "../../utils/uniqueItems";

export default function Catalogue(props) {
  function updateFilters()
  {

  }

  const colors = getUniqueItems(props.items.map((data) => data.color));
  const maxPrice = Math.max(...(props.items.map((data) => data.price)));
  console.log(maxPrice);

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
                onChange={updateFilters}
              />
            </label>
            <label className="catalogue__label">
              Новинки
              <input className="catalogue__checkbox"
                type="checkbox"
                id="filter-new"
                onChange={updateFilters}
              />
            </label>
            <label className="catalogue__label">
              Скидки
              <input className="catalogue__checkbox"
                type="checkbox"
                id="filter-discount"
                onChange={updateFilters}
              />
            </label>
            <select className="catalogue__select"
              id="filter-color"
              onChange={updateFilters}
              defaultValue=""
            >
              <option disabled value="">Цвет</option>        
              {
                colors
                  .map((color, i) => 
                    <option className="catalogue__option"
                      key={`color-${i}`}
                      value={color}
                    >
                      {color}
                    </option>
                  )
              }
            </select>
            <label className="catalogue__label">
              Цена от 
              <input className="catalogue__num-input"
                type="number"
                id="filter-min-price"
                min={0}
                onChange={updateFilters}
                placeholder="0"
              />
              до 
              <input className="catalogue__num-input"
                type="number"
                id="filter-max-price"
                min={0}
                onChange={updateFilters}
                placeholder={maxPrice}
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