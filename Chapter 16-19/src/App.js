import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost";

function App() {
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     title: "My First Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
  //   },
  //   {
  //     id: 2,
  //     title: "My 2nd Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
  //   },
  //   {
  //     id: 3,
  //     title: "My 3rd Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
  //   },
  //   {
  //     id: 4,
  //     title: "My Fourth Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
  //   },
  // ]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts"); // HTTP GET is the read operation in CRUD
        // Unlike fetch, axios automatically creates JSON so no need to use "response.json".
        // Unlike fetch, axios automatically catches errors when the response status code is not 200.
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the response 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // No response received
          console.log("Error" + err.message);
        }
      }
    };

    fetchPosts();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody,
    };
    try {
      await api.post("/posts", newPost); // HTTP POST is the create operation in CRUD
      const postList = [...posts, newPost];
      setPosts(postList);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log("Error:" + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/posts/" + id); // HTTP DELETE is the delete operation in CRUD
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      navigate("/");
    } catch (err) {
      console.log("Error:" + err.message);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id: id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    try {
      await api.put("/posts/" + id, newPost); // HTTP PUT is the update operation in CRUD
      setPosts(posts.map((post) => (post.id === id ? { ...newPost } : post)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              posts={posts
                .filter(
                  (post) =>
                    post.body.toLowerCase().includes(search.toLowerCase()) ||
                    post.title.toLowerCase().includes(search.toLowerCase())
                )
                .reverse()}
            />
          }
        />
        <Route
          exact
          path="/post"
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmission={handleSubmission}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

// React Router is a routing library. It enables the creation of single-page web applications with multiple pages that can be navigated without refreshing the entire page

// To install React Router, perform "npm i react-router-dom -S"

// Note: the online tutorial used React Router V5 instead of V6 so the syntax is different

// In React Router library, useNavigate() hook returns a navigate function that you can use to change the URL or navigate to different routes within your application.

// The usage of axois methods for example: axois.get(url, config). "url" specifies the URL to which the HTTP request gets to (in this case, http://localhost:3500/posts). "config" optionally specifies an object that corresponds to the HTTP request
