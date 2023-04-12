import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study(){
    const { deckId } = useParams()
    const [ deck, setDeck ] = useState({})
    const [ cards, setCards ] = useState([])
    const [ cardNumber, setCardNumber ] = useState(1)
    const [ front, isFront ] = useState(true)
    const history = useHistory()

    useEffect(()=>{
        async function fetchData() {
            const abortController = new AbortController()
            const response = await readDeck(deckId, abortController.signal)
            setDeck(response)
            setCards(response.cards)
            return () =>{
                abortController.abort()
            }
        }
        fetchData()
    }, [])

    function flipCard(){
        if(front){
            isFront(true)
        } else {
            isFront(false)
        }
    }

    function nextCard(index, total) {
        console.log(index)
        if(index < total){
            setCardNumber(cardNumber + 1)
            isFront(true)
        } else {
            if(
                window.confirm (
                    `Restart cards? Click 'cancel' to return to the home page`
                )
            ) {
               setCardNumber(1)
               isFront(true)
        } else {
              history.push("/")
           }
        }
    }

    function showNextButton(cards, index) {
        if(front){
            return null
        } else {
            return (
                <button 
                    onClick ={()=> nextCard(index + 1, cards.length)}
                >
                    Next
                </button>    
            )
        }
    }

    function enoughCards() {
        return (
            <div>
                {cards.map((card, index)=>{
                    if(index === cardNumber - 1){
                        return (
                            <div key={card.id}>
                                <div>
                                    {`Card ${index+1} of ${cards.length}`}
                                </div>
                                <div>
                                    {front ? card.front : card.back}
                                </div>
                                <button
                                    onClick={flipCard}
                                >
                                    Flip
                                </button>
                                {showNextButton(cards, index)}
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    function notEnoughCards(){
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are {cards.length}{" "}
                    cards in this deck.
                </p>
                <Link to={`/decks/${deck.id}/cards/new`}>
                    Add Cards
                </Link>
            </div>
        )
    }

    return (
        <div>
            <ol>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li>
                    Study
                </li>
            </ol>
            <div>
                <h2>{`${deck.name}: Study`}</h2>
                <div>
                    {cards.length === 0 
                        ? notEnoughCards()
                        : cards.length > 2
                        ? enoughCards()
                        : notEnoughCards()}
                </div>
            </div>
        </div>
    )    
}

export default Study