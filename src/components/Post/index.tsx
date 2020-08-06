import React from 'react';
// import moment from 'moment';
import { IPostData } from '../../interfaces';
import { firestore } from '../../config/firebase';

type postData = {
  post: IPostData;
};

const Post: React.FC<postData> = ({ post }: postData) => {
  const { id, content, title, comments, stars, user } = post;
  const postRef = firestore.doc(`posts/${id}`);
  const handleRemove = () => postRef.delete();
  const star = () => postRef.update({ stars: stars + 1 });

  return (
    <article className="Post">
      <div className="Post--content">
        {/* <Link to={`/posts/${id}`} /> */}
        <h3>{title}</h3>
        <div>{content}</div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          {/* <p>{moment(createdAt.toDate()).calendar()}</p> */}
        </div>
        <div>
          <button type="button" className="star" onClick={star}>
            Star
          </button>
          <button type="button" className="delete" onClick={handleRemove}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;
