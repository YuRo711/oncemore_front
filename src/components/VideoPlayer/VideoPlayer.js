import { useSearchParams } from "react-router-dom";
import "./VideoPlayer.css";

export default function VideoPlayer(props) {
  //#region Variables

  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
  const data = props.videos
    .filter((video) => video.id == id)[0];
  const { link, productId, productName, price, views } = data;

  //#endregion

  return (
    <main className="player">
      <div className="player__main">
        <video className="player__video"
          src={link}
          autoPlay
          controls
        />
      </div>
    </main>
  );
}