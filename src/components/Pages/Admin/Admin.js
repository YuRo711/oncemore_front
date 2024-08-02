import "./Admin.css";

export default function Admin(props) {
  return (
    <main className="admin">
      <div className="admin__buttons">
        <button className="admin__button"
          onClick={props.openProductModal}
        >
          Новый продукт
        </button>
      </div>
    </main>
  );
}