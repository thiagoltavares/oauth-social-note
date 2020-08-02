import React from 'react';
import { IPostData } from '../../types';

type postData = {
  post: IPostData;
};

const Post: React.FC<postData> = ({
  post: { id, content, title, comments, stars, user },
}: postData) => {
  const star = () => console.log('star');
  const remove = () => console.log('star');

  return (
    <article className="Post">
      <div className="Post--content">
        {/* <Link to={`/posts/${id}`}>
        </Link> */}
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
          <p>
            Posted by
            {user.displayName}
          </p>
          {/* <p>{moment(createdAt.toDate()).calendar()}</p> */}
        </div>
        <div>
          <button type="button" className="star" onClick={star}>
            Star
          </button>
          <button type="button" className="delete" onClick={remove}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;
