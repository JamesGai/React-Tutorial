import React from "react";

const Buttons = ({ requestType, handleResource }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button
        className={requestType === "users" ? "selected" : null}
        onClick={() => handleResource("users")}
      >
        users
      </button>
      <button
        className={requestType === "posts" ? "selected" : null}
        onClick={() => handleResource("posts")}
      >
        posts
      </button>
      <button
        className={requestType === "comments" ? "selected" : null}
        onClick={() => handleResource("comments")}
      >
        comments
      </button>
    </form>
  );
};

export default Buttons;
