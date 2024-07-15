import { useSearchParams } from "react-router-dom";
import "./VideoPlayer.css";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useEffect, useState } from "react";

export default function VideoPlayer(props) {
  //#region Variables

  const searchParams = useSearchParams();
  const id = searchParams[0].get("id");
  const data = props.videos
    .filter((video) => video.id == id)[0];
  const { link, productId, productName, price, author, views } = data;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    props.getUser((author))
      .then((user) => setUserData(user));
  }, [])

  //#endregion

  //#region Rendering

  return (
    <main className="player">
      <div className="player__main">
        <video className="player__video"
          src={link}
          autoPlay
        />
        <div className="player__video-info">
          <UserAvatar
            userData={userData}
          />
        </div>
      </div>
    </main>
  );

  //#endregion
}