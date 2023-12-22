import React from "react";

const List = ({ content }) => {
  return (
    <ul>
      {content.map((line) => (
        <li key={line.id}>{JSON.stringify(line)}</li>
      ))}
    </ul>
  );
};

export default List;
