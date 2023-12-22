import React from "react";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const NewPost = () => {
  const { postTitle, setPostTitle, postBody, setPostBody, handleSubmission } =
    useContext(DataContext);

  return (
    <main className="NewPost">
      <h2>Add Post</h2>
      <form className="newPostForm" onSubmit={handleSubmission}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit post</button>
      </form>
    </main>
  );
};

export default NewPost;
