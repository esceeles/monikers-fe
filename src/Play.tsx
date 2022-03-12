import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {buttonStyle} from "./Welcome";

export function Play() {
    const navigate = useNavigate();

    // @ts-ignore
    let usePile = useLocation().state.deck as number[]
    // @ts-ignore
    let teamA =useLocation().state.teamA as map<string, boolean>
    // @ts-ignore
    let teamB =useLocation().state.teamB as map<string, boolean>
    // @ts-ignore
    let players = useLocation().state.players as string[]

    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [activeCards, setActiveCards] = useState<number[]>(usePile.slice());
    const [currentViewIndex, setCurrentViewIndex] = useState<number>(0);
    const [round, setRound] = useState(1);
    const [teamAPoints, setTeamAPoints] = useState(0);
    const [teamBPoints, setTeamBPoints] = useState(0);

    function nextPlayer() {
        if (currentPlayer < players.length -1 ) {
            setCurrentPlayer(currentPlayer + 1)
        } else {
            setCurrentPlayer(0)
        }
        nextCard()
        reset()
        setIsActive(false)
        setReady(false)
    }

    function nextCard() {
        if (currentViewIndex >= activeCards.length - 1) {
            setCurrentViewIndex(0)
        } else {
            setCurrentViewIndex(currentViewIndex + 1)
        }
    }

    useEffect(() => {
        if (round < 4) {
            nextPlayer()
            setActiveCards(usePile.slice());
        } else {
            let winner :string
            if (teamAPoints > teamBPoints) {
                winner = "Team A"
            } else if (teamBPoints > teamAPoints) {
                winner = "Team B"
            } else {
                winner = "Its a Tie"
            }
            navigate('/results', {state: {winner: winner}})
        }
    }, [round]);

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [ready, setReady] = useState(false);

    function reset() {
        setSeconds(0);
    }

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            // if (interval !== null) {
            //     clearInterval(interval);
            // }
        }
        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        }
    }, [isActive, seconds]);

    useEffect(() => {
        if (seconds >= 10) {
            nextPlayer();
            reset();
        }
    }, [seconds]);

    return (
        <>
            <div>
                Round {round} <br/>
                You're Up: {players[currentPlayer]}!
                {ready ? (
                    <div className = "flex-col w-full h-full position: absolute">
                        <div className="time">
                            {seconds}s
                        </div>
                        {activeCards[currentViewIndex] != undefined && (
                            <div className=" mt-6 w-3/4 m-auto">
                                <img className="" src={require("./img/cards/".concat(String(activeCards[currentViewIndex]), ".png"))} alt="WHAT?!"/>
                            </div>
                        )}
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    if (activeCards.length - 1 > currentViewIndex) {
                                        setCurrentViewIndex(currentViewIndex + 1)
                                    } else {
                                        setCurrentViewIndex(0)
                                    }
                                }}
                                className={buttonStyle}
                                type="submit">
                                Pass
                            </button>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    if (teamA.get(players[currentPlayer])) {
                                        setTeamAPoints(teamAPoints + 1)
                                    } else if (teamB.get(players[currentPlayer])) {
                                        setTeamBPoints(teamBPoints + 1)
                                    } else {
                                        console.log("who da fuck is this?!")
                                    }
                                    activeCards.splice(currentViewIndex, 1);
                                    if (activeCards.length === 0) {
                                        setRound(round + 1)
                                    } else {
                                        nextCard()
                                    }
                                }}
                                className={buttonStyle}
                                type="submit">
                                Guessed
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        Ready?
                        <button
                            onClick={() => {
                                setReady(true)
                                setIsActive(true)
                            }}
                            className={buttonStyle}
                            type="submit">
                            Ready
                        </button>
                    </div>
                )}

            </div>
        </>
    );
}