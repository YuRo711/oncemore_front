import defaultVid from "../temp/video.mp4";

class videoApi {
  async getVideos() {
    return [
      {
        link: defaultVid,
        productName: "Название товара",
        price: 250,
        author: "Автор",
        views: 12500,
      },
      {
        link: defaultVid,
        productName: "Название товара 2",
        price: 250,
        author: "Автор 2",
        views: 400,
      },
    ]
  }
}

export default new videoApi();