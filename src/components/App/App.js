import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";
import { categories, contacts, banners, userLinks } from "../../utils/constants";
import { Navigate, Route, Routes, json } from "react-router";
import { useEffect, useRef, useState } from "react";
import LoginModal from "../Modals/LoginModal/LoginModal";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import MobileMenu from "../MobileMenu/MobileMenu";
import Banners from "../Pages/Banners/Banners";
import Product from "../Pages/Product/Product";
import Catalogue from "../Pages/Catalogue/Catalogue";
import api from "../../utils/api";
import VideoPlayer from "../Pages/VideoPlayer/VideoPlayer";

import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import Cart from "../Pages/Cart/Cart";
import Gallery from "../Pages/Gallery/Gallery";
import Liked from "../Pages/Liked/Liked";
import Profile from "../Pages/Profile/Profile";
import VideoModal from "../Modals/VideoModal/VideoModal";
import UserModal from "../Modals/UserModal/UserModal";
import Admin from "../Pages/Admin/Admin";
import NewProductModal from "../Modals/NewProductModal/NewProductModal";
import AdminRoute from "../AdminRoute/AdminRoute";

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

  async function getVideos() {
    return api.getVideos()
      .then((res) => res.data);
  }

  function getAllComments() {
    return api.getComments();
  }

  function getUser(id) {
    return api.getUser(id);
  }

  function getProduct(id) {
    const product = products.find((product) => product.id == id);
    return product ? product : {};
  }

  async function getProducts() {
    return api.getProducts();
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

  function productVideoModal(productData) {
    setCurrentProduct(productData);
    handleModalOpen("video");
  }

  function deleteReview(reviewData) {
    
  }

  function blockUser(userData) {
    
  }

  function deleteComment(commentData) {

  }

  async function getComments(videoId) {
    return getAllComments()
      .then((comments) => comments.filter(
        (comment) => comment.videoId == videoId
      ));
  }

  function sendComment(commentText, videoId)
  {
    const userId = user.id;
    api.addComment(commentText, userId, videoId);
  }

  function likeComment(commentId)
  {
    
  }

  function addView(videoId) {
    videos.find((video) => video.id == videoId)
      .views++;
  }

  function addProduct(productData)
  {
    api.addProduct(productData)
      .then((res) => console.log(res));
  }


  //#endregion


  //#region Variables Setup

  const [isLoggedIn, setLoggedIn] = useState(true);
  const [modalsActivity, setModalsActivity] = useState({
    signup: false,
    login: false,
    video: false,
    user: false,
    newproduct: false,
  });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOnMobile, setOnMobile] = useState(window.innerWidth < 600);
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [currentProduct, setCurrentProduct] = useState("");

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data));
    getVideos()
      .then((res) => setVideos(res));
    getUser(0)
      .then((res) => setUser(res));
  }, []);



  //#endregion

  //#region Rendering
  if (products.length == 0) {
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
              openVideoModal={(data) => productVideoModal(data)}
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
              deleteReview={deleteReview}
              blockUser={blockUser}
              getComments={getComments}
              deleteComment={deleteComment}
              sendComment={sendComment}
              likeComment={likeComment}
              addView={addView}
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
              openVideoModal={() => handleModalOpen("video")}
              openUserModal={() => handleModalOpen("user")}
            />
          }/>
          <Route path="me" element={
            <Navigate to={`/user?id=${user.id}`}/>
          }/>
            <Route path="/admin" element={
              <AdminRoute>
                <Admin
                  openProductModal={() => handleModalOpen("newproduct")}
                />
              </AdminRoute>
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
        <VideoModal
          name="video"
          onClose={handleModalClose}
          isOpen={modalsActivity["video"]}
          product={currentProduct}
        />
        <UserModal
          name="user"
          onClose={handleModalClose}
          isOpen={modalsActivity["user"]}
          onSubmit={() => {}}
        />
        <NewProductModal
          name="newproduct"
          onClose={handleModalClose}
          isOpen={modalsActivity["newproduct"]}
          addProduct={addProduct}
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