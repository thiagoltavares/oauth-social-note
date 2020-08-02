import React from 'react';
import { IPostData } from '../../types';

type postData = {
  onCreate: (post: IPostData) => void;
};

const AddPost: React.FC<postData> = () => {
  // const handleSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   console.log(e.target.text);
  // };

  return (
    <h1>ok</h1>
    /*     <form onSubmit={handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        // value={title}
        // onChange={this.handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        // value={content}
        // onChange={this.handleChange}
      />
      <input className="create" type="submit" value="Create Post" />
    </form> */
  );
};

export default AddPost;
