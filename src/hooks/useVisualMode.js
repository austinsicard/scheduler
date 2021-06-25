import { useState } from "react";

// Custom Hook to change between components
function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);


  // Updates the current mode and saves it to history, can revert to previous mode if specified
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode])
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }
  // Back function goes to previous mode
  function back() {
    // Prevent reverting more than once
    if (history.length <= 1) return;
    setHistory((prev) => [...prev.slice(0, -1)]);
  }

  return { mode: history[history.length - 1], transition, back };
}

export default useVisualMode;