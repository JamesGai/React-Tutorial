import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDeletion }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)} // we must have an annonymous function because we are passing a reference to the item id
        checked={item.checked}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)} // we must have an annonymous function because we are passing a reference to the item id
      >
        {item.description}
      </label>
      <FaTrashAlt
        onClick={() => handleDeletion(item.id)} // we must have an annonymous function because we are passing a reference to the item id
        role="button"
        tabIndex="0"
      />
    </li>
  );
};

export default LineItem;
