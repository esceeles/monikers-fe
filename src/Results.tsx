import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./Welcome.css";

function Results() : JSX.Element {
    // @ts-ignore
    let winner = useLocation().state.winner as string

    return (
        <div className="text-6xl pt-10 pb-20 font-bold">
                The Winner is: <br/>{winner}
            <div className="fill w-full mt-16">
                <img className="bottom-0" src={require("./img/cover_art_bare_small.png")} alt="WHAT?!"/>
            </div>
        </div>
    )
}

export default Results;