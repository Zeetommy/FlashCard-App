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

    async function handleDeleteDeck(deck) {
      if (
        window.confirm(`Delete this deck? You will not be able to recover it`)
      ) {
        const abortController = new AbortController()
        try {
          history.push("/")
          return await deleteDeck(deck.id, abortController.signal)
        } catch (error) {
          console.error("Something went wrong", error)
        }
        return () => {
          abortController.abort()
        }
      }
    }

    async function handleDeleteCard(card) {
      if (
        window.confirm(`Delete this card? You will not be able to recover it`)
      ) {
        const abortController = new AbortController()
        try {
          history.go(0)
          return await deleteCard(card.id, abortController.signal);
        } catch (error) {
          console.error("Something went wrong", error)
        }
        return () => {
          abortController.abort()
        }
      }
    }

    async function handleEditDeck() {
      history.push(`/decks/${deckId}/edit`)
    }

    async function handleStudy() {
      history.push(`/decks/${deckId}/study`)
    }

    async function handleAddCard() {
      history.push(`/decks/${deckId}/cards/new`)
    }

    async function handleEditCard(card) {
      history.push(`/decks/${deckId}/cards/${card.id}/edit`)
    }

    if (cards.length > 0) {
      return (
        <div>
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{deck.name}</li>
          </ol>
          <div>
            <div>
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
              <button
                onClick={() => handleEditDeck()}
              >
                Edit
              </button>
              <button
                onClick={() => handleStudy()}
              >
                Study
              </button>
              <button
                onClick={() => handleAddCard()}
              >
                Add Cards
              </button>
              <button
                onClick={() => handleDeleteDeck(deck)}
              >
                Delete
              </button>
            </div>
          </div>
          <h1>Cards</h1>
          {cards.map((card) => {
            return (
              <div key={card.id}>
                <div>
                  <div>
                    <div className="row">
                      <div className="col">{card.front}</div>
                      <div className="col">{card.back}</div>
                    </div>
                    <div className="container row">
                      <button
                        onClick={() => handleEditCard(card)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return null
    }
}

export default Deck