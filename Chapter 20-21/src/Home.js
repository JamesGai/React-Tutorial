import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const Home = () => {
  const { searchResult, fetchError, isLoading } = useContext(DataContext);

  return (
    <main className="Home">
      {fetchError ? (
        <p>{fetchError}</p>
      ) : !fetchError && isLoading ? (
        <p>Loading</p>
      ) : !fetchError && !isLoading ? (
        searchResult.length ? (
          <div>
            {searchResult.map((post) => (
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
        )
      ) : null}
    </main>
  );
};

export default Home;
