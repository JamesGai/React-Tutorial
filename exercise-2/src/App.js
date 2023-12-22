import "./App.css";
import { useState, useEffect } from "react";
import Buttons from "./Buttons";
import List from "./List";
import Table from "./Table";

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/";

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestType, setRequestType] = useState("users");
  const [resource, setResource] = useState(API_URL + "users");
  const [content, setContent] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(resource);
        if (!response.ok) {
          throw Error("Data did not found");
        }
        const content = await response.json();
        setContent(content);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 2000);
  }, [resource]);

  const handleResource = (resource) => {
    setRequestType(resource);
    setResource(API_URL + resource);
  };

  return (
    <div className="App">
      {fetchError ? <p style={{ color: "red" }}>Error: {fetchError}</p> : null}
      {!fetchError && isLoading ? <p>loading</p> : null}
      {!fetchError && !isLoading ? (
        <div>
          <Buttons requestType={requestType} handleResource={handleResource} />
          {/* <List content={content} /> */}
          <Table content={content} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
