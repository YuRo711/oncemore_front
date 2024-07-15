import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import { categories, contacts, products } from "../../utils/constants";
import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import LoginModal from "../Modals/LoginModal/LoginModal";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import MobileMenu from "../MobileMenu/MobileMenu";
import Banners from "../Banners/Banners";
import Product from "../Product/Product";
import Catalogue from "../Catalogue/Catalogue";
import videoApi from "../../utils/videoApi";

export default function App(props) {
  //#region Methods

  function handleModalClose(modalId) {
    setModalsActivity({ ...modalsActivity, [modalId]: false });
  }

  function handleModalOpen(modalId) {
    setModalsActivity({ ...modalsActivity, [modalId]: true });
  }

  function openAnotherModal(modalId, newModalId) {
    setModalsActivity({
      ...modalsActivity,
      [modalId]: false,
      [newModalId]: true,
    });
  }

  function getVideos() {
    return videoApi.getVideos();
  }

  //#endregion


  //#region Variables Setup

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [modalsActivity, setModalsActivity] = useState({
    signup: false,
    login: false,
  });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOnMobile, setOnMobile] = useState(window.innerWidth < 600);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos()
      .then((res) => setVideos(res));
  }, [])


  //#endregion

  //#region Rendering

  return (
    <div className="page">
      <Header
        categories={categories}
        isLoggedIn={isLoggedIn}
        handleModalOpen={handleModalOpen}
        isOnMobile={isOnMobile}
        setMenuOpen={setMenuOpen}
      />
      <Routes>
        <Route path="item" element={
          <Product
            videos={videos}
            items={products}
          />
        }/>
        <Route path="items" element={
          <Catalogue
            items={products}
            videos={videos}
          />
        }/>
        <Route path="/" element={
          <Banners />
        }/>
      </Routes>
      <Footer
        contacts={contacts}
      />
      <RegisterModal
        name="signup"
        onClose={handleModalClose}
        isOpen={modalsActivity["signup"]}
        openAnotherModal={() => openAnotherModal("signup", "login")}
      />
      <LoginModal
        name="login"
        onClose={handleModalClose}
        isOpen={modalsActivity["login"]}
        openAnotherModal={() => openAnotherModal("login", "signup")}
      />
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        openLoginModal={() => handleModalOpen("login")}
        categories={categories}
      />
    </div>
  );

  //#endregion
}