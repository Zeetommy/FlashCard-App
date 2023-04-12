import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api/index"

function EditDeck() {
    const { deckId } = useParams()
    const history = useHistory()
    const initialDeckState = {
        id: "",
        name: "",
        description: "",
    };
    const [deck, setDeck] = useState(initialDeckState)

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController()
            try {
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
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