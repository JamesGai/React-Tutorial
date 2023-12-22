import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Called once at load time
    handleResize();

    // Any time the resize event triggers we can continue to call this function
    window.addEventListener("resize", handleResize);

    // Prevent memory leak
    const cleanUp = () => {
      console.log("runs if a useEffect dependency changes");
      window.removeEventListener("resize", handleResize);
    };

    return cleanUp;
  }, []);

  return windowSize;
};

export default useWindowSize;

// A hook (e.g. useState, useEffect, useContext) is a function that allows you to use state and other React features in functional components.

// A custom hook is a function that utilizes one or more built-in hooks to enable you to reuse stateful logic across multiple components. It is also a way to abstract complex logic into a reusable function that can be used in functional components.
