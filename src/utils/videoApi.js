import defaultVid from "../temp/video.mp4";

class videoApi {
  async getVideos() {
    return [
      {
        link: defaultVid,
        productId: 1,
        productName: "Название товара",
        price: 250,
        author: "Автор",
        views: 12505,
        id: 0,
      },
      {
        link: defaultVid,
        productId: 0,
        productName: "Название товара 2",
        price: 250,
        author: "Автор 2",
        views: 400,
        id: 1,
      },
    ]
  }
}

export default new videoApi();