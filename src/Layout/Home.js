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
}