import Canvas from "./Canvas";
import Input from "./Input";
import { useState, userState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("");
  const [hex, setHex] = useState("");
  const [isDarkColor, setIsDarkColor] = useState(true);

  return (
    <div className="App">
      <Canvas color={color} hex={hex} isDarkColor={isDarkColor} />
      <Input
        color={color}
        isDarkColor={isDarkColor}
        setColor={setColor}
        setHex={setHex}
        setIsDarkColor={setIsDarkColor}
      />
    </div>
  );
}

export default App;
