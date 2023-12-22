import React from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id); // similar to map and filter

  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={"/edit/" + id}>
              <button className="editButton">Edit</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete post
            </button>
          </>
        ) : (
          <h2>Post not found</h2>
        )}
      </article>
    </main>
  );
};

export default PostPage;

// In React Router, the useParams() hook is used to access the parameters defined in the URL, in this case, "id" from /post/id can be retrieved by this hook
