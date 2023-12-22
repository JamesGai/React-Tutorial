import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItems from "./SearchItems";
import { useState, useEffect } from "react";

function App() {
  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     checked: false,
  //     description: "This is item 1",
  //   },
  //   {
  //     id: 2,
  //     checked: true,
  //     description: "This is item 2",
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     description: "This is item 3",
  //   },
  // ]);

  // load data from local storage so data remains constant after a re-render
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("classlist") || [])
    // The operator "|| []" ensures the web can acquire the key ("classlist") if the list is empty or the prgram has neven been run in this browser
  );

  const [newItem, setNewItem] = useState("");

  const [searchItems, setSearchItems] = useState("");

  // useState is a hook used to manage state (data that can be changed over time) within a component
  // useEffect is a hook used to perform side effects (e.g. fetching data, setting up event listeners, updating DOM) in a component under certain condition
  useEffect(() => {
    // store the item list locally each time it gets changed
    localStorage.setItem("classlist", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, description: item };
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleCheck = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
  };

  // Creates an array of items that does not contain the item with id being clicked
  const handleDeletion = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
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
      <Content
        items={items.filter((item) =>
          item.description
            .toLowerCase()
            .includes(searchItems.toLocaleLowerCase())
        )}
        handleCheck={handleCheck}
        handleDeletion={handleDeletion}
      />
      <Footer length={items.length} />
    </div>
  );
}

// prop (properties) is responsible for passing data from a parent component to a child component

// prop drilling is the process of passing data from a parent component to its children and then
// those children pass the same data to their children and so on (e.g. component App is passing
// data to Content, Content is also passing data to ItemList, and ItemList is also passing data to LineItem).

export default App;
