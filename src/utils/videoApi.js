import defaultVid from "../temp/video.mp4";

class videoApi {
  async getVideos() {
    return [
      {
        link: defaultVid,
        productId: 1,
        productName: "Название товара",
        price: 250,
        author: 0,
        views: 12505,
        id: 0,
      },
      {
        link: defaultVid,
        productId: 0,
        productName: "Название товара 2",
        price: 250,
        author: 0,
        views: 400,
        id: 1,
      },
    ]
  }

  async getUsers() {
    return [
      {
        id: 0,
        name: "testuser",
        avatar: null,
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
}

export default new videoApi();