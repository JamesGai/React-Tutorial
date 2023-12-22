import LineItem from "./LineItem";

const ItemList = ({ items, handleCheck, handleDeletion }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDeletion={handleDeletion}
        />
      ))}
    </ul>
  );
};

export default ItemList;
