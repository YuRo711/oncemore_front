import defaultVid from "../temp/video.mp4";
import {baseUrl, products} from "./constants";

class Api {
  constructor() {
    this._baseUrl = baseUrl;
    this._headers = new Headers({
      "content-type": "application/json",
    });
  }

  async _request(url, method, requestBody, headers = this._headers, files = null) {
    return fetch(this._baseUrl + url, {
      method: method,
      headers: headers,
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res);
        return Promise.reject(this._processError(res));
      }
    });
  }

  _processError(res) {
    if (res.status == 409)
      return "Пользователь с таким email или handle уже существует";
    if (res.status == 401)
      return "Авторизация не удалась: проверьте данные";
  }

  //#region Reviews & Comments

  async getVideos() {
    return this._request("/reviews", "GET");
  }

  async addReview(data) {
    return this._request("/reviews", "POST", data);
  }

  async getComments(videoId)
  {
    return this._request(`/comments/${videoId}`, "GET");
  }

  //#endregion

  //#region Product

  async addProduct(productData) {
    return this._request("/products", "POST", productData);
  }

  async getProducts() {
    return this._request("/products", "GET");
  }


  async getProduct(id) {
    return products
      .filter((product) => product.id == id)[0];
  }

  async addComment(text, author, review) {
    return this._request(`/comments`, "POST", {text, author, review});     
  }

  async likeProduct(id) {
    return this._request(`/products/${id}/like`, "PATCH");
  }

  async unlikeProduct(id) {
    return this._request(`/products/${id}/unlike`, "PATCH");
  }

  //#endregion

  //#region User

  async signIn(email, password) {
    return this._request(`/signin`, "POST", {email, password}); 
  }

  async auth(token) {
    this.setTokenHeader(token);
    return this._request("/users/me", "GET");
  }

  setTokenHeader(token) {
    this._headers = new Headers({
      "content-Type": "application/json",
      authorization: `Bearer ${token}`,
    });
  }

  async createUser(data) {
    return this._request(`/signup`, "POST", data); 
  }

  async editUser(data) {
    return this._request("/users/me", "PATCH", data);
  }

  async getUser(id) {
    return this._request(`/users/${id}`, "GET");    
  }

  async getCurrentUser() {
    return this._request(`/users/me`, "GET"); 
  }


  //#endregion

  //#region Categories & Banners

  async createCategory(data) {
    return this._request(`/categories`, "POST", data); 
  }

  async deleteCategory(data) {
    return this._request(`/categories`, "DELETE", data); 
  }

  async getCategories() {
    return this._request(`/categories`, "GET"); 
  }

  //#endregion
}

export default new Api();