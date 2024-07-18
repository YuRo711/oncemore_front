import "./DropdownMenu.css";
import { NavLink } from "react-router-dom";

export default function DropdownMenu(props) {

  return (
    <div className="dropdown">
      <div className={`dropdown__links ${
        props.isOpen ? "dropdown__links_visible" : ""
      }`}>
      {
        props.links.map((link, i) => 
          <NavLink className="dropdown__link"
            key={`dropdown-category-$${i}`}
            to={link.link}
          >
            {link.name}
          </NavLink>
        )
      }
      </div>
    </div>
  );
}