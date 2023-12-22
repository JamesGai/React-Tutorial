import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/post" element={<NewPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
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
