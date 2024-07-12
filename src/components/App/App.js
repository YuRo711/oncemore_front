import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import { categories, contacts } from "../../utils/constants";
import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import LoginModal from "../Modals/LoginModal/LoginModal";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import MobileMenu from "../MobileMenu/MobileMenu";
import Banners from "../Banners/Banners";
import Product from "../Product/Product";

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

  //#endregion


  //#region Variables Setup

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [modalsActivity, setModalsActivity] = useState({
    signup: false,
    login: false,
  });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOnMobile, setOnMobile] = useState(window.innerWidth < 600);


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
        <Route path="/" element={
          <Banners />
        }/>
        <Route path="item" element={
          <Product />
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