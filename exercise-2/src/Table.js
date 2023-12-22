import React from "react";

const Table = ({ content }) => {
  return (
    <div>
      <table className="table-container">
        <tbody>
          {content.map((item) => (
            <tr key={item.id}>
              {Object.entries(item).map(([key, value]) => {
                return (
                  <td key={item.id + "-" + key}>{JSON.stringify(value)}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// Object.entries(obj) is a JavaScript method that takes an object as an argument and returns an array where each element is an array containing two items: property key and the value associated with that key (an array of string-keyed pairs).

// For example
// const obj = {a: 1, b: 2, c: 3};
// const entries = Object.entries(obj);
// entries = [["a", 1], ["b", 2], ["c", 3]]
