import colorNames from "colornames";

const Input = ({ color, isDarkColor, setColor, setHex, setIsDarkColor }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button onClick={() => setIsDarkColor(!isDarkColor)}>
        Toggle text color
      </button>
      <input
        autoFocus
        id="color"
        type="text"
        placeholder="Color name"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          setHex(colorNames(e.target.value));
        }}
      />
    </form>
  );
};

export default Input;
