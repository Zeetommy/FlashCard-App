import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function study(){
    const { deckId } = useParams()
    const [ deck, setDeck ] = useState({})
    const [ card, setcard ] = useState([])
    const [ cardNumber, setCardNumber ] = useState(1)
    const [ flip, isFlip ] = useState(true)
    const history = useHistory()

    useEffect(()=>{
        async function fetchData() {
            const abortController = new AbortController()
            const response = await readDeck(deckId, abortController.signal)
            setDeck(response)
            setcard(response.cards)
            return () =>{
                abortController.abort
            }
        }
        fetchData()
    }, [])
    
}