import Comment from "../Comment/Comment";
import "./Comments.css";

export default function Comments(props) {
  const { comments } = props;

  return (
    <div className="comments">
      <div className="comments__header">
        <h2 className="comments__title">
          Комментарии ({comments.length})
        </h2>
        <button className="comments__close"
          onClick={() => props.setCommentsOpen(false)}
        />
      </div>
      <div className="comments__main">
        {
          comments.map((comment) =>
            <Comment
              data={comment}
              getUser={props.getUser}
              deleteComment={props.deleteComment}
            />
          )
        }
      </div>
    </div>
  );
}