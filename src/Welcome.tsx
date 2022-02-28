import * as React from "react";
import {useNavigate} from "react-router-dom";
import "./Welcome.css";

export const buttonStyle = "mx-10 w-60 text-black text-2xl h-20 font-bold flex-shrink-0 bg-cyan-800 hover:bg-cyan-900 border-sky-300 hover:border-cyan-900 text-sm border-1 text-white py-1 px-2 rounded"


function Welcome() : JSX.Element {
    const navigate = useNavigate();

    return (
        <div style={{backgroundColor: "#FFDAB9"}}
            className="w-full">

            <div className="text-6xl pt-10 pb-20 font-bold">
                WELCOME
            </div>
            <div className="flex-col">
                <div className="mt-8">
                <button
                    className={buttonStyle}
                    type="submit"
                    onClick={() => {navigate('/join', {state: {create: true}})}}>
                    Create Game
                </button>
                </div>
                <div className="mt-8">
                <button
                    className={buttonStyle}
                    type="submit"
                    onClick={() => {navigate('/join', {state: {create: false}})}}>
                    Join Game
                </button>
                </div>
            </div>
            <div className="fill w-full mt-16">
                <img className="bottom-0" src={require("./img/cover_art_bare_small.png")} alt="WHAT?!"/>
            </div>
        </div>
    )
}

export default Welcome;