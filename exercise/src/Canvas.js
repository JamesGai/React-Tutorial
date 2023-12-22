const Canvas = ({ color, hex, isDarkColor }) => {
  return (
    <section
      className="canvas"
      style={{ backgroundColor: color, color: isDarkColor ? "#000" : "#FFF" }}
    >
      <p>{color ? color : "Empty value"}</p>
      <p>{hex ? hex : null}</p>
    </section>
  );
};

Canvas.defaultProps = {
  color: "black",
};

export default Canvas;
