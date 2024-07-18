import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import { categories, contacts, products, banners, userLinks } from "../../utils/constants";
import { Navigate, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import LoginModal from "../Modals/LoginModal/LoginModal";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import MobileMenu from "../MobileMenu/MobileMenu";
import Banners from "../Pages/Banners/Banners";
import Product from "../Pages/Product/Product";
import Catalogue from "../Pages/Catalogue/Catalogue";
import videoApi from "../../utils/api";
import VideoPlayer from "../Pages/VideoPlayer/VideoPlayer";

import testVid from "../../temp/video.mp4";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import Cart from "../Pages/Cart/Cart";
import Gallery from "../Pages/Gallery/Gallery";
import Liked from "../Pages/Liked/Liked";
import Profile from "../Pages/Profile/Profile";

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

  function getUser(id) {
    return videoApi.getUser(id);
  }

  function getProduct(id) {
    return videoApi.getProduct(id);
  }

  function addItem(e, id) {
    e.stopPropagation();
    e.preventDefault();

    const item = products.find((pr) => pr.id == id);
    console.log(item);
    setCart([...cart, item]);
  }

  function clearCart() {
    setCart([]);
  }

  function likeItem(e, id) {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn || !user) {
      handleModalOpen("login");
      return;
    }

    const item = products.find((item) => item.id == id);
    if (item.likes.includes(user.id))
      item.likes.pop(user.id);
    else
      item.likes.push(user.id);
  }

  //#endregion


  //#region Variables Setup

  const [isLoggedIn, setLoggedIn] = useState(true);
  const [modalsActivity, setModalsActivity] = useState({
    signup: false,
    login: false,
  });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOnMobile, setOnMobile] = useState(window.innerWidth < 600);
  const [videos, setVideos] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getVideos()
      .then((res) => setVideos(res));
    getUser(0)
      .then((res) => setUser(res));
  }, [])


  //#endregion

  //#region Rendering
  if (videos.length == 0 || products.length == 0) {
    return <div className="page">
      Loading...
    </div>
  }

  return (
    <div className="page">
      <CartContext.Provider value={{ cart, addItem }}>
      <UserContext.Provider value={{ user }}>      
        <Header
          categories={categories}
          userLinks={userLinks}
          isLoggedIn={isLoggedIn}
          handleModalOpen={handleModalOpen}
          isOnMobile={isOnMobile}
          setMenuOpen={setMenuOpen}
        />
        <div className="page__main">
        <Routes>
          <Route path="item" element={
            <Product
              videos={videos}
              items={products}
              addItem={addItem}
              likeItem={likeItem}
              openLoginModal={() => handleModalOpen("login")}
              isLoggedIn={isLoggedIn}
            />
          }/>
          <Route path="items/gallery" element={
            <Gallery
              items={products}
              videos={videos}
              likeItem={likeItem}
              openLoginModal={() => handleModalOpen("login")}
              isLoggedIn={isLoggedIn}
              getProduct={getProduct}
            />
          }/>
          <Route path="items" element={
            <Catalogue
              items={products}
              videos={videos}
              addItem={addItem}
              likeItem={likeItem}
              openLoginModal={() => handleModalOpen("login")}
              isLoggedIn={isLoggedIn}
              getProduct={getProduct}
            />
          }/>
          <Route path="review" element={
            <VideoPlayer
              videos={videos}
              items={products}
              getUser={getUser}
              getProduct={getProduct}
            />
          }/>
          <Route path="liked" element={
            <Liked
              isLoggedIn={isLoggedIn}
              openSignUp={() => handleModalOpen("signup")}
              items={products}
            />
          }/>
          <Route path="cart" element={
            <Cart
              clearCart={clearCart}
              likeItem={likeItem}
            />
          }/>
          <Route path="user" element={
            <Profile
              getUser={getUser}
              videos={videos}
              getProduct={getProduct}
            />
          }/>
          <Route path="me" element={
            <Navigate to={`/user?id=${user.id}`}/>
          }/>
          <Route path="/" element={
            <Banners
              banners={banners}
            />
          }/>
        </Routes>
        </div>
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
      </UserContext.Provider>
      </CartContext.Provider>
    </div>
  );

  //#endregion
}