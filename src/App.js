import React from "react";
import Riddle from "./components/riddle";

import { sonnets } from "./helpers/sonnets";

const App = () => {
  const resetApplication = () => {
    document.getElementsByClassName("main")[0].classList.remove("active");
  };

  return (
    <div>
      <h1>Cryptogram</h1>
      <button onClick={() => resetApplication()} className="reset">
        RESET
      </button>
      <Riddle
        riddle={sonnets[Math.floor(Math.random() * sonnets.length - 1)]}
      />
    </div>
  );
};

export default App;
