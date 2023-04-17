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
    }
    const [deck, setDeck] = useState(initialDeckState)

    useEffect(() => {
      async function fetchData() {
        const abortController = new AbortController();
        try {
          const response = await readDeck(deckId, abortController.signal);
          setDeck(response);
        } catch (error) {
          console.error("Something went wrong", error);
        }
        return () => {
          abortController.abort();
        };
      }
      fetchData();
    }, [deckId]);

    function handleChange({ target }) {
      setDeck({
        ...deck,
        [target.name]: target.value,
      })
    }

    async function handleSubmit(event) {
      event.preventDefault()
      const abortController = new AbortController()
      const response = await updateDeck({ ...deck }, abortController.signal)
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
                <li>
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li >Edit Deck</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h1>Edit Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        onChange={handleChange}
                        type="text"
                        value={deck.name}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        type="text"
                        value={deck.description}
                    />
                </div>
                <button
                    onClick={() => handleCancel()}
                >
                    Cancel
                </button>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditDeck