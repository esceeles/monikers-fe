import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {buttonStyle} from "./Welcome";

function StartGame(playerName: string, isCreate: boolean, joinCode: {}, setLookAtHand: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
    return (
        <div className="flex-col w-full h-full position: absolute align-center justify-center text-black text-2xl font-bold" style={{backgroundColor: "#FFDAB9"}}>
            <div className = "flex-col w-full h-full position: absolute">
                <div className="mt-24">Hello {playerName}</div>
                {isCreate ? (
                    <div className="mt-16">Join Code: {joinCode}
                        <button
                            onClick={() => {setLookAtHand(true)}}
                            className={buttonStyle}
                            type="submit">
                            Start Game
                        </button>
                    </div>
                ) : (
                    <div className="mt-64">
                        Waiting for host to start...
                    </div>
                )}
            </div>
        </div>
    )
};

export function Play() {

    // @ts-ignore
    let playerName =useLocation().state.playerName as string
    // @ts-ignore
    let isCreate =useLocation().state.isCreate as boolean
    // @ts-ignore
    const [joinCode, setJoinCode] = useState<{}>(useLocation().state.joinCode as string);
    const [hand, setHand] = useState<number[]>([]);
    const [lookAtHand, setLookAtHand] = useState(false);
    const [playStarted, setPlayStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [discardCount, setDiscardCount] = useState(3);

    useEffect(
        () => {
            setCurrentIndex(0);
    }, [hand]);

    useEffect(() => {
        isCreate ? (
        fetch(`http://localhost:8080/createGame?hostName=${playerName}`)
            .then( (response) => {
                let jsonResp = response.json();
                jsonResp.then(data => {
                    setJoinCode(data["JoinCode"])
                    setHand(data["Hand"] as number[])
                })
            })
        ): (
            fetch(`http://localhost:8080/joinGame?name=${playerName}&joinCode=${joinCode}`)
                .then( (response) => {
                    let jsonResp = response.json();
                    jsonResp.then(data => {
                        setHand(data["Hand"] as number[])
                    })
                })
        )
    }, []);

    return (
        <>
        !lookAtHand ? (
                <>
                    {StartGame(playerName, isCreate, joinCode, setLookAtHand,}
                </>

            ) : (
                <div className="flex-col w-full h-full position: absolute align-center items-center justify-center text-black text-2xl font-bold" style={{backgroundColor: "#FFDAB9"}}>
                    <div className = "flex-col w-full h-full position: absolute">
                        {hand.length > 0 && (
                            <div className=" mt-6 w-3/4 m-auto">
                                <img className="" src={require("./img/".concat(String(hand[currentIndex]), ".png"))} alt="WHAT?!"/>
                            </div>
                        )}
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    if (hand.length -1 > currentIndex) {
                                        setCurrentIndex(currentIndex + 1)
                                    } else {
                                        setCurrentIndex(0)
                                    }
                                }}
                                className={buttonStyle}
                                type="submit">
                                Next
                            </button>
                        </div>
                        {discardCount > 0 ? (
                            <div className="mt-4">
                                <button
                                    onClick={() => {
                                        setDiscardCount(discardCount - 1)
                                        console.log(hand);
                                        console.log(currentIndex);
                                        hand.splice(currentIndex, 1);
                                        console.log(hand);
                                    }}
                                    className={buttonStyle}
                                    type="submit">
                                    Discard ({discardCount})
                                </button>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <button
                                    onClick={() => {
                                        setDiscardCount(discardCount - 1)
                                        console.log(hand);
                                        console.log(currentIndex);
                                        hand.splice(currentIndex, 1);
                                        console.log(hand);
                                    }}
                                    className={buttonStyle}
                                    type="submit">
                                    
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )
        </>
    );
}