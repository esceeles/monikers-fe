import * as React from "react";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {buttonStyle} from "./Welcome";

function SignUp(): JSX.Element {

    // @ts-ignore
    let isCreate = useLocation().state.create;

    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState("");
    const [joinCode, setJoinCode] = useState("");

    const updatePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value);
    };

    const updateJoinCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJoinCode(event.target.value);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/play', {state: {playerName: playerName, isCreate: isCreate, joinCode: joinCode}});
    };

    return (
        <div className="flex w-full h-full position: absolute align-center justify-center" style={{backgroundColor: "#FFDAB9"}}>
                <form className="w-full max-w-sm mt-20" onSubmit={onSubmit}>
                    <div className="flex-col items-center border-b border-cyan-800 py-2 mb-20 text-black text-2xl font-bold">
                        <label>
                            Name
                        </label>
                        <div className="mt-10"/>
                        <input
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            id="name"
                            onChange={updatePlayerName}
                            value={playerName}/>
                    </div>
                        {!isCreate && (
                    <div className="flex-col items-center border-b border-cyan-800 py-2 mb-20 text-black text-2xl font-bold">
                            <label>
                                Join Code
                            </label>
                        <div className="mt-10"/>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                id="joinCode"
                                onChange={updateJoinCode}
                                value={joinCode}/>
                            </div>
                        )}
                    <div className="mt-20">
                        <button
                            className={buttonStyle}
                            type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
        </div>
    )
}

export default SignUp;
