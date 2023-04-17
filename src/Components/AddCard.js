import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { createCard, readDeck } from "../utils/api/index"

function AddCard() {
  const { deckId } = useParams()
  const history = useHistory()
  const initialState = {
    front: "",
    back: "",
  }

  const [newCard, setNewCard] = useState(initialState)
  const [deck, setDeck] = useState({})

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
  }, [deckId])

  function handleChange({ target }) {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await createCard(
      deckId,
      { ...newCard },
      abortController.signal
    )
    history.go(0)
    setNewCard(initialState)
    return response
  }

  async function handleDone() {
    history.push(`/decks/${deckId}`)
  }
  return (
    <div>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li>Add Card</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <h2>{deck.name}: Add Card</h2>
        <div>
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            onChange={handleChange}
            type="text"
            value={newCard.front}
          />
        </div>
        <div>
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            onChange={handleChange}
            type="text"
            value={newCard.back}
          />
        </div>
        <button onClick={() => handleDone()}>
          Done
        </button>
        <button type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default AddCard