import "./Catalogue.css";
import ProductCard from "../ProductCard/ProductCard";
import { getUniqueItems } from "../../utils/uniqueItems";

export default function Catalogue(props) {
  function updateFilters()
  {

  }

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
            >
              <option value="" disabled selected>Цвет</option>        
              {
                getUniqueItems(
                  props.items.map((data) => data.color)
                )
                  .map((color, i) => 
                    <option className="catalogue__option"
                      id={`color-${i}`}
                      value={color}
                    >
                      {color}
                    </option>
                  )
              }
            </select>
            <label className="catalogue__label">
              Цена от...
              <input className="catalogue__num-input"
                type="number"
                id="filter-min-price"
                min={0}
                onChange={updateFilters}
              />
              до...
              <input className="catalogue__num-input"
                type="number"
                id="filter-max-price"
                min={0}
                onChange={updateFilters}
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