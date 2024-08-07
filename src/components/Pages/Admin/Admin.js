import { useContext } from "react";
import "./Admin.css";
import { UserContext } from "../../../contexts/UserContext";

export default function Admin(props) {
  const privelege = useContext(UserContext).user.privelege;

  return (
    <main className="admin">
      {
        privelege > 1 ?
        <div className="admin__buttons">
          <button className="admin__button"
            onClick={props.openProductModal}
          >
            Новый продукт
          </button>
          <button className="admin__button"
            onClick={props.openProductModal}
          >
            Редактировать продукт
          </button>
          <button className="admin__button"
            onClick={props.openBannerModal}
          >

            Добавить баннер
          </button>
          <button className="admin__button"
            onClick={props.openDeleteBannerModal}
          >
            Удалить баннер
          </button>

          <button className="admin__button"
            onClick={props.openCategoryModal}
          >
            Добавить категорию
          </button>
          <button className="admin__button"
            onClick={props.openDeleteCategoryModal}
          >
            Удалить категорию
          </button>
        </div>
        : ""
      }
    </main>
  );
}