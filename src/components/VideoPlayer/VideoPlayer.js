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
  const { link, productId, price, author, views, tags } = data;

  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    props.getUser((author))
      .then((user) => setUserData(user));
    props.getProduct((productId))
      .then((product) => setProductData(product));
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
          {
            userData ?
            <div className="player__user">
              <UserAvatar
                userData={userData}
              >
                <button className="player__user-button"/>
              </UserAvatar>
              <div className="player__author">
                @{userData.name}
              </div>
              <div className="player__tags">
                {
                  tags.map((tag) => 
                    <p className="player__tag">#{tag}</p>
                )
                }
              </div>
            </div>
            : ""
          }
          </div> 
      </div>
    </main>
  );

  //#endregion
}