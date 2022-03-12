import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {buttonStyle} from "./Welcome";

function SignUp(): JSX.Element {

    // @ts-ignore
    let gameCode =useLocation().state.gameCode as string

    const navigate = useNavigate();

    const [teamA, setTeamA] = useState<string[]>([""]);
    const [teamB, setTeamB] = useState<string[]>([""]);

    useEffect(() => {
        setTeamA([""])
        setTeamB([""]);
    }, [gameCode]);


    const handleInputChangeA = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const list = [...teamA];
        list[index] = e.target.value;
        setTeamA(list);
    }

    const handleInputChangeB = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const list = [...teamB];
        list[index] = e.target.value;
        setTeamB(list);
    }

    const handleAddClickA = () => {
        setTeamA([...teamA, ""]);
    };

    const handleAddClickB = () => {
        setTeamB([...teamB, ""]);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let players = new Array(0)
        let teamAMap = new Map()
        let teamBMap = new Map()
        //assume both teams are even for now
        for (let i = 0; i < teamA.length; i++) {
            players.push(teamA[i])
            players.push(teamB[i])
            teamAMap.set(teamA[i], true)
            teamBMap.set(teamB[i], true)
        }
        navigate('/prep', {state: {teamA: teamAMap, teamB: teamBMap, players: players}});
    };

    return (
        <div>
            <form className="w-full max-w-sm mt-20" onSubmit={onSubmit}>
                <div className="flex-col items-center border-cyan-800 py-2 mb-20 text-black text-2xl font-bold">
                    <label>
                        Team A Players
                    </label>
                    {teamA.map((x, i) => {
                        return (
                            <div key={i}>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={x}
                                    onChange={e => handleInputChangeA(e, i)}
                                />
                                <div>
                                    {teamA.length - 1 === i && <button onClick={handleAddClickA}>Add</button>}
                                </div>
                            </div>
                        );
                    })}
                    <div className="mt-10"/>
                    <label>
                        Team B Players
                    </label>
                    {teamB.map((x, i) => {
                        return (
                            <div key={i}>
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={x}
                                    onChange={e => handleInputChangeB(e, i)}
                                />
                                <div>
                                    {teamB.length - 1 === i && <button onClick={handleAddClickB}>Add</button>}
                                </div>
                            </div>
                        );
                    })}
                    <div className="mt-10"/>
                </div>
                <div className="mt-2">
                    <button
                        className={buttonStyle}
                        type="submit">
                        Done
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
