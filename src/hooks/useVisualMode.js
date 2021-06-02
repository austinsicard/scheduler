import { useState } from 'react';

 export default function useVisualMode(initial) { 

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode)
    if (replace) {
      setHistory(prev => [prev[0]])
    }
    
    setHistory(prev => [...prev, newMode])
  }

   function back() {
    //  console.log(history)
     history.pop();
     if (history.length) {
       return setMode(history[history.length - 1 ]);
     }
   }

  return { mode, transition, back };
}