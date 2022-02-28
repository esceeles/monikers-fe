import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import {Play} from "./Play";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/join" element={<SignUp/>}/>
                <Route path="/play" element={<Play/>}/>
            </Routes>
    </div>
  );
}

export default App;
