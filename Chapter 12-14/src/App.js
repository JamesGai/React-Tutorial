import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItems from "./SearchItems";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchItems, setSearchItems] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // load data from JSON server at web loading time only (first come to the web)
  useEffect(() => {
    // Asynchronous functions in React allow you to perform time-consuming tasks (e.g. data fetching from an API) without blocking main thread
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Did not receive expeceted data");
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null); // no error occurs
      } catch (err) {
        setFetchError(err.message); // error occurs
      } finally {
        setIsLoading(false);
      }
    };

    // Start loading data after 2 seconds (2000 miliseconds)
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, description: item };
    const newItems = [...items, newItem];
    setItems(newItems);

    // POST API: add items to the JSON file
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleCheck = async (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);

    // PATCH API: update the checked status of an item
    const checkedItem = newItems.filter((item) => item.id === id)[0];
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: checkedItem.checked }),
    };
    const requestURL = API_URL + "/" + id;
    const result = await apiRequest(requestURL, updateOptions);
    if (result) {
      setFetchError(result);
    }
  };

  // Creates an array of items that does not contain the item with id being clicked
  const handleDeletion = async (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);

    // DELETE API: delete an item
    const deleteOptions = { method: "DELETE" };
    const requestURL = API_URL + "/" + id;
    const result = await apiRequest(requestURL, deleteOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleAddition = (e) => {
    e.preventDefault(); // prevent auto page refresh after handling a submission event
    console.log("submitted");
    if (!newItem) {
      return;
    }
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Class list" />
      <SearchItems searchItems={searchItems} setSearchItems={setSearchItems} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleAddition={handleAddition}
      />
      <main>
        {fetchError ? (
          <p style={{ color: "red" }}>"Error:"{fetchError}</p>
        ) : null}
        {!fetchError && isLoading ? <p>loading</p> : null}
        {!fetchError && !isLoading ? (
          <Content
            items={items.filter((item) =>
              item.description
                .toLowerCase()
                .includes(searchItems.toLocaleLowerCase())
            )}
            handleCheck={handleCheck}
            handleDeletion={handleDeletion}
          />
        ) : null}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

// To start a json server, type "npx json-server -p 3500 -w data/db.json" where data is the folder name and "db.json" is the file name

export default App;
