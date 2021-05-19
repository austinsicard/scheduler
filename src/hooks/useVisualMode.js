import { useState } from 'react';

 export default function useVisualMode(initial) { 


  // set up to initial -- FIRST 
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition to new -- SECOND 
  // transition to next -- THIRD
  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    
    setHistory(prev => [...prev, newMode])
    return setMode(newMode);
  }

   // back to SECOND
   // back to FIRST
   function back() {
     if (history.length > 1) {
       history.pop();
       return setMode(history[history.length - 1 ]);
     }
   }

  return { mode, transition, back };
}