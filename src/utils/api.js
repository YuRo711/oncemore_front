import defaultVid from "../temp/video.mp4";
import {baseUrl, products} from "./constants";

class Api {
  constructor() {
    this._baseUrl = baseUrl;
    this._headers = new Headers({
      "content-type": "application/json",
    });
  }

  async _request(url, method, requestBody, headers = this._headers) {
    return fetch(this._baseUrl + url, {
      method: method,
      headers: headers,
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("something went wrong");
      }
    });
  }

  async addProduct(productData) {
    return this._request("/products", "POST", productData);
  }

  async getProducts() {
    return this._request("/products", "GET");
  }


  async getVideos() {
    return this._request("/reviews", "GET");
  }

  async getUsers() {
    return [
      {
        id: 0,
        name: "Иван Иванов",
        handle: "testuser",
        avatar: null,
        points: 18.01,
        privilege: 1
      },
    ]
  }

  async getComments()
  {
    return [];
  }

  async getUser(id) {
    return this._request(`/users/${id}`, "GET");    
  }

  async getCurrentUser() {
    return this._request(`/users/me`, "GET"); 
  }

  async getProduct(id) {
    return products
      .filter((product) => product.id == id)[0];
  }

  async addComment(text, user, video) {
    
  }
}

export default new Api();