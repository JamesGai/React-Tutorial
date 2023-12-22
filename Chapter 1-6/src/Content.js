import { useState } from "react";
import "./App.css";

// Arrow function
const Content = () => {
  // useState Hook is a function that returns a stateful value and a function to update it [currentState, functionToUpdateState]
  const [name, setName] = useState("Warrior");
  const [level, setLevel] = useState(1);

  const GenerateClass = () => {
    const classes = ["Warrior", "Shaman", "Warlock", "Rogue"];
    const randomNumber = Math.floor(Math.random() * 4);
    setName(classes[randomNumber]);
  };

  const LevelUp = () => {
    setLevel(level + 1);
  };

  const IdentifyClass = (className) => {
    console.log("You are currently playing as", className);
  };

  return (
    <div className="Content">
      <p>Recommended class: {name}</p>
      <button onClick={GenerateClass}>Change class</button>
      <p>Current level: {level}</p>
      <button onClick={LevelUp}>Level up</button>
      <button onClick={() => IdentifyClass(name)}> Identify</button>
    </div>
  );
};

export default Content;

// We use curly braces {} between HTML keywords (e.g. <p>) to indicate JavaScript variable and function name

// Conditions that trigger React to update UI by re-rendering components are state changes, prop changes, event handlers (e.g. clicking button).
