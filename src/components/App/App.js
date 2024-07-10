import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import { categories, contacts } from "../../utils/constants";

export default function App(props) {
  return (
    <div className="page">
      <Header
        categories={categories}
      />
      <Footer
        contacts={contacts}
      />
    </div>
  );
}