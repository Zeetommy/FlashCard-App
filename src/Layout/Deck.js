import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function Deck() {
    const history = useHistory()
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                )
                setDeck(deckResponse)
                setCards(deckResponse.cards)
            } catch (error) {
                console.error("Something went wrong", error)
            }
            return () => {
                abortController.abort()
            }
        }
        fetchData()
    }, [])
}