import defaultVid from "../temp/video.mp4";
import {products} from "./constants";

class videoApi {
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
        points: 18.01
      },
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
}

export default new videoApi();