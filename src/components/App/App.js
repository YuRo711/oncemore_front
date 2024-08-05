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
import { getToken, removeToken, setToken } from "../../utils/token";
import Logout from "../Pages/Logout/Logout";
import CategoryModal from "../Modals/CategoryModal/CategoryModal";
import CategoryDeleteModal from "../Modals/CategoryModal/CategoryDeleteModal";

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

  function getUser(id) {
    return api.getUser(id);
  }

  function getProduct(id) {
    const product = products.find((product) => product._id == id);
    return product ? product : {};
  }

  async function getProducts() {
    return api.getProducts();
  }

  function addItem(id) {
    const item = products.find((pr) => pr._id == id);
    if (item.stock == 0) return;

    if (cart.includes(item)) {
      const index = cart.indexOf(item);
      if (cartAmounts[index] >= item.stock) return;
      cartAmounts[index]++;
    } else {
      setCart([...cart, item]);
      cartAmounts.push(1);
    }
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

    const item = products.find((item) => item._id == id);
    if (item.likes.includes(user.id)) {
      item.likes.pop(user.id);
      api.unlikeProduct(id);
    }
    else {
      item.likes.push(user.id);
      api.likeProduct(id);
    }
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
    return api.getComments(videoId);
  }

  function sendComment(commentText, videoId)
  {
    const userId = user._id;
    api.addComment(commentText, userId, videoId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function likeComment(commentId)
  {
    
  }

  function addView(videoId) {
    if (videos.length == 0) return;
    
    // videos.find((video) => video.id == videoId)
    //   .views++;
  }

  function addProduct(productData)
  {
    api.addProduct(productData)
      .then((res) => console.log(res));
  }

  async function signIn(email, password) {
    return api
      .signIn(email, password)
      .then((res) => {
        setToken(res.token);
        auth(res.token);
        handleModalClose("login");
      })
      .catch((err) => alert(err));
  }

  function auth(token) {
    api
      .auth(token)
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signUp(email, password, name, handle) {
    api.createUser({email, password, name, handle})
      .then(() => signIn(email, password))
      .catch((err) => alert(err));
  }

  function logOut() {
    removeToken();
    setLoggedIn(false);
  }

  function checkToken() {
    const token = getToken();
    if (token) {
      auth(token);
    }
  }

  async function addReview(video, product, text) {
    const author = user._id;
    api.addReview({video, product, author, text});
  }

  async function editUser(image) {
    api.editUser({image});
  }

  async function deleteCategory(name) {
    api.deleteCategory({name});
  }

  async function createCategory(name) {
    const link = `/items?filter=${name}`;
    api.createCategory({name, link});
  }

  async function getCategories() {
    return api.getCategories()
      .then((res) => res.data);
  }


  //#endregion


  //#region Variables Setup

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [modalsActivity, setModalsActivity] = useState({
    signup: false,
    login: false,
    video: false,
    user: false,
    newproduct: false,
    category: false,
    categorydelete: false,
  });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOnMobile, setOnMobile] = useState(window.innerWidth < 600);
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartAmounts, setCartAmounts] = useState([]);
  const [user, setUser] = useState({});
  const [currentProduct, setCurrentProduct] = useState("");

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data));
    getVideos()
      .then((res) => setVideos(res));
    getCategories()
      .then((res) => setCategories(res));
    checkToken();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    api.getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => setLoggedIn(false));
  }, [isLoggedIn]);



  //#endregion

  //#region Rendering
  if (products.length == 0) {
    return <div className="page">
      Loading...
    </div>
  }

  return (
    <div className="page">
      <CartContext.Provider value={{ cart, addItem, cartAmounts }}>
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
              addItem={addItem}
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
            <Navigate to={`/user?id=${user._id}`}/>
          }/>
            <Route path="admin" element={
              <AdminRoute>
                <Admin
                  openProductModal={() => handleModalOpen("newproduct")}
                  openCategoryModal={() => handleModalOpen("category")}
                  openDeleteCategoryModal={() => handleModalOpen("categorydelete")}
                />
              </AdminRoute>
            }/>
          <Route path="logout" element={
            <Logout logOut={logOut}/>
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

        <div className="modals">
          <RegisterModal
            name="signup"
            onClose={handleModalClose}
            isOpen={modalsActivity["signup"]}
            openAnotherModal={() => openAnotherModal("signup", "login")}
            signUp={signUp}
          />
          <LoginModal
            name="login"
            onClose={handleModalClose}
            isOpen={modalsActivity["login"]}
            openAnotherModal={() => openAnotherModal("login", "signup")}
            signIn={signIn}
          />
          <VideoModal
            name="video"
            onClose={handleModalClose}
            isOpen={modalsActivity["video"]}
            product={currentProduct}
            loadVideo={addReview}
          />
          <UserModal
            name="user"
            onClose={handleModalClose}
            isOpen={modalsActivity["user"]}
            onSubmit={editUser}
          />
          <NewProductModal
            name="newproduct"
            onClose={handleModalClose}
            isOpen={modalsActivity["newproduct"]}
            addProduct={addProduct}
          />
          <CategoryModal
            name="category"
            onClose={handleModalClose}
            isOpen={modalsActivity["category"]}
            addProduct={addProduct}
            onSubmit={createCategory}
          />
          <CategoryDeleteModal
            name="categorydelete"
            onClose={handleModalClose}
            isOpen={modalsActivity["categorydelete"]}
            addProduct={addProduct}
            onSubmit={deleteCategory}
          />

        </div>
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