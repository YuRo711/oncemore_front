import "./DropdownMenu.css";
import { useState } from "react";
import icon from "../../images/grid-2.svg"
import { NavLink } from "react-router-dom";

export default function DropdownMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button className={`dropdown__button ${
          isOpen ? "dropdown__button_open" : ""
        }`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img className="dropdown__icon"
          src={icon}
        />
        Категории
      </button>
      <div className={`dropdown__links ${
        isOpen ? "dropdown__links_visible" : ""
      }`}>
      {
        props.links.map((link, i) => 
          <NavLink className="dropdown__link"
            key={`dropdown-category-$${i}`}
            to={`/items?filter=${link.filter}`}
          >
            {link.name}
          </NavLink>
        )
      }
      </div>
    </div>
  );
}