import "./ProductCard.css";

export default function ProductCard(props) {
  const { image, name, price, color } = props.data;

  return (
    <div className="item">
      <img className="item__image"
        src={image}
        alt={name}
      />
      <h3 className="item__name">{name}</h3>
      <h4 className="item__price">{price}₽</h4>
      <button className="item__cart-button">В корзину</button>
      <button className="item__like-button"/>
    </div>
  );
}