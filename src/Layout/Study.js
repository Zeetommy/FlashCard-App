import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function study(){
    const { deckId } = useParams()
    const [ deck, setDeck ] = useState({})
    const [ card, setcard ] = useState([])
    const [ cardNumber, setCardNumber ] = useState(1)
    const [ front, isFront ] = useState(true)
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
}