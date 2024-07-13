import "./MultiSelect.css";
import icon from "../../images/caret-down.svg";

export default function MultiSelect(props) {
  return (
    <div className="multiselect">
      <button className="multiselect__button"
        type="button"
      >
        {props.title}
        <img className="multiselect__icon"
          src={icon}
        />
      </button>
    </div>
  );
}