import UserAvatar from "../UserAvatar/UserAvatar";

import ("./Review.css");

export default function Review(props) {
  const { isVideo, author } = props;

  return (
    <div className="review">
      <div className="review__main">
        <div className="review__author">
          <UserAvatar
            userData={author}
          >
            <button className="player__user-button"/>
          </UserAvatar>
        </div>
      </div>
    </div>
  );
}