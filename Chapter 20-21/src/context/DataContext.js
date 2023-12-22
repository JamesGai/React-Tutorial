import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // We basically move the following code into a custom hook called "useAxiosFetch" that improve code reusability
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts"); // HTTP GET is the read operation in CRUD
  //       // Unlike fetch, axios automatically creates JSON so no need to use "response.json".
  //       // Unlike fetch, axios automatically catches errors when the response status code is not 200.
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         // Not in the response 200 range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         // No response received
  //         console.log("Error" + err.message);
  //       }
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // Fetch JSON file data from a custom hook
  useEffect(() => {
    setPosts(data);
  }, [data]);

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
    <DataContext.Provider
      value={{
        posts,
        search,
        setSearch,
        searchResult: posts
          .filter(
            (post) =>
              post.body.toLowerCase().includes(search.toLowerCase()) ||
              post.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse(),
        fetchError,
        isLoading,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        handleSubmission,
        handleDelete,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
        handleEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

// In React, "useContext" is a hook that allows you to consume data from a React context where React context provides a way to pass data through the component tree without having to pass props manually at every level.

// "useContext" is useful for sharing data that is needed by many components in an application
