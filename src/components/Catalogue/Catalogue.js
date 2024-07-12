import "./Catalogue.css";
import ProductCard from "../ProductCard/ProductCard";

export default function Catalogue(props) {
  return (
    <main className="catalogue">
      <h2 className="catalogue__title">Глаза</h2>
      <div className="catalogue_products">
        <div className="catalogue__filters">
          <form className="catalogue__filter-form">
            
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