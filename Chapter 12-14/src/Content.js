import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDeletion }) => {
  return (
    // HTML keyword does not have an element inside is called fragment (e.g. <>)
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDeletion={handleDeletion}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>List is empty</p>
      )}
    </>
  );
};

export default Content;
