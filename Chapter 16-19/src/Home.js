import React from "react";
import { Link } from "react-router-dom";

const Home = ({ posts }) => {
  return (
    <main className="Home">
      {posts.length ? (
        <div>
          {posts.map((post) => (
            <article className="post" key={post.id}>
              <Link to={"/post/" + post.id}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
              </Link>
              <p className="postBody">
                {post.body.length <= 25
                  ? post.body
                  : post.body.slice(0, 25) + "..."}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "2rem", color: "red" }}>No posts</p>
      )}
    </main>
  );
};

export default Home;
