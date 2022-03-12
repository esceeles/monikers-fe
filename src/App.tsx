import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import {Prep} from "./Prep";
import {Play} from "./Play";
import Results from "./Results";

function App() {
  return (
    <div className="App">
        <div className="flex-col w-full h-full position: absolute align-center items-center justify-center text-black text-2xl font-bold" style={{backgroundColor: "#FFDAB9"}}>

        <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/join" element={<SignUp/>}/>
                <Route path="/prep" element={<Prep/>}/>
                <Route path="/play" element={<Play/>}/>
                <Route path="/results" element={<Results/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
