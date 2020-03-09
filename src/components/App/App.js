import React from "react";
import "./App.css";
import Desk from "../Desk/Desk";

const App = ({ sections }) => {
  return (
    <div className="App">
      <header className="header">
        <h2 className="header-text">My Desk</h2>
      </header>
      <Desk sections={sections} />
    </div>
  );
};

export default App;
