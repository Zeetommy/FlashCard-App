import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readCard, readDeck, updateCard } from "../utils/api/index"

function EditCard() {
  const { deckId, cardId } = useParams()
  const history = useHistory()
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  }
  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  }

  const [card, setCard] = useState(initialDeckState)
  const [deck, setDeck] = useState(initialCardState)

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController()
      try {
        const cardResponse = await readCard(cardId, abortController.signal)
        const deckResponse = await readDeck(deckId, abortController.signal)
        setCard(cardResponse)
        setDeck(deckResponse)
      } catch (error) {
        console.error("Something went wrong", error)
      }
      return () => {
        abortController.abort()
      }
    }
    fetchData()
  }, [])

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await updateCard({ ...card }, abortController.signal)
    history.push(`/decks/${deckId}`)
    return response
  }

  async function handleCancel() {
    history.push(`/decks/${deckId}`)
  }

  return (
    <div>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li>Edit Card {cardId}</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <h2>Edit Card</h2>
        <div>
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            onChange={handleChange}
            type="text"
            value={card.front}
          />
        </div>
        <div>
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            onChange={handleChange}
            type="text"
            value={card.back}
          />
        </div>
        <button
          
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditCard