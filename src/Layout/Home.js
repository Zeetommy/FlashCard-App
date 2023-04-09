import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function Home(){
    const history = useHistory()
    const [ decks,setDecks ] = useState([])
    useEffect(()=>{
        async function loadDecks(){
            const abortController = new AbortController();
            try{
                const deckResponse = await listDecks(abortController.signal)
                setDecks(deckResponse)
           } catch(error) {
                console.error("Something went wrong", error)
           }
        return () => {
            abortController.abort
            }
       }
    loadDecks()
    }, [])

    async function handleDelete(decks){
        if(window.confirm(`Delete this deck? You will not be able to recover it`)){
            history.go(0)
            return await deleteDeck(deck.id)
        }
    }

    return (
        <div>
            <Link to="/decks/new">
                Create Deck
            </Link>
            <div>
                {decks.map((deck)=>{
                    return(
                        <div>
                            <div>
                                <div>
                                    {`${deck.name}`}
                                </div>
                                <div>
                                    {`${deck.cards.length} cards`}
                                </div>
                                <div>
                                    {`${deck.description}`}
                                </div>
                                <Link to = {`decks/${deck.id}`}>
                                    View
                                </Link>
                                <Link to = {`decks/${deck.id}/study`}>
                                    Study
                                </Link>
                                <button 
                                    type="delete"
                                    onclick={() => handleDelete(deck)}
                                    >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}