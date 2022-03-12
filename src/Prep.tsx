import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {buttonStyle} from "./Welcome";
import * as fs from "fs";

let overRideCardLength = 56
let dir = './img/cards'

function getDeck() {
    let length = 0

    if (overRideCardLength != 0) {
        length = overRideCardLength
    } else {
        fs.readdir(dir, (err, files) => {
            length = files.length
        });
    }

    let deck = Array.from({length: length}, (_, index) => index + 1);

    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    return deck
}

function drawCards(deck: number[]) {
    let newHand = new Array(0)

    for (let i = 0; i < 8; i++) {
        let card = deck.pop()
        newHand.push(card)
    }
    return newHand
}

export function Prep() {
    // @ts-ignore
    let teamA =useLocation().state.teamA as map
    // @ts-ignore
    let teamB =useLocation().state.teamB as map
    // @ts-ignore
    let players = useLocation().state.players as string[]

    const navigate = useNavigate();

    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [hand, setHand] = useState<number[]>([]);
    const [deck, setDeck] = useState<number[]>([]);
    const [usePile, setUsePile] = useState<number[]>([]);
    const [currentViewIndex, setCurrentViewIndex] = useState<number>(0);
    const [discardCount, setDiscardCount] = useState(3);

    useEffect(() => {
        let deck = getDeck()
        setDeck(deck);
    }, []);

    useEffect(() => {
        let newHand = drawCards(deck)
        setHand(newHand)
    }, [deck]);

    useEffect(() => {
        let newUsePile = usePile.concat(hand)
        setUsePile(newUsePile)
        if (currentPlayer === players.length) {
            startGame(newUsePile)
        } else {
            setCurrentViewIndex(0)
            setHand(drawCards(deck))
            setDiscardCount(3)
        }
    }, [currentPlayer]);

    const startGame = (pile : number[]) => {
        navigate('/play', {state: {deck: pile, players: players, teamA: teamA, teamB: teamB}})
    };

    return (
        <>
            <div>
                Choose Your Cards: {players[currentPlayer]}
                <div className = "flex-col w-full h-full position: absolute">
                    {hand[currentViewIndex] != undefined && (
                        <div className=" mt-6 w-3/4 m-auto">
                            <img className="" src={require("./img/cards/".concat(String(hand[currentViewIndex]), ".png"))} alt="WHAT?!"/>
                        </div>
                    )}
                    <div className="mt-4">
                        <button
                            onClick={() => {
                                if (hand.length - 1 > currentViewIndex) {
                                    setCurrentViewIndex(currentViewIndex + 1)
                                } else {
                                    setCurrentViewIndex(0)
                                }
                            }}
                            className={buttonStyle}
                            type="submit">
                            Next
                        </button>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => {
                                setDiscardCount(discardCount - 1)
                                hand.splice(currentViewIndex, 1);
                                if (discardCount === 1) {
                                    setCurrentPlayer(currentPlayer + 1)
                                } else {
                                    if (currentViewIndex >= hand.length) {
                                        setCurrentViewIndex(0)
                                    }
                                }
                            }}
                            className={buttonStyle}
                            type="submit">
                            {`Discard `.concat(String(discardCount)) }
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}