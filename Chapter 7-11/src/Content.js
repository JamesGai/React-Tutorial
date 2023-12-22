import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDeletion }) => {
  return (
    <main>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDeletion={handleDeletion}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>List is empty</p>
      )}
    </main>
  );
};

export default Content;

// <ul> defines an unordered list where <li> defines a list item
// react can only display list items

// each list item in react needs a key for unique identification
