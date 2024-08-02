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


  async getVideos() {
    return [
      {
        link: defaultVid,
        productId: 1,
        author: 0,
        views: 12505,
        id: 0,
        tags: [],
      },
      {
        link: defaultVid,
        productId: 0,
        author: 0,
        views: 400,
        id: 1,
        tags: ["cat", "notreal"],
        reviewText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      },
    ]
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
    return [
      {
        id: 0,
        userId: 0,
        videoId: 1,
        text: "Отличное видео!"
      }
    ]
  }

  async getUser(id) {
    return this.getUsers()
      .then((users) => 
        users.filter((user) => user.id == id)
        [0]
    );
  }

  async getProduct(id) {
    return products
      .filter((product) => product.id == id)[0];
  }

  async addComment(text, user, video) {
    
  }
}

export default new Api();