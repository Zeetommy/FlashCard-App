import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function Form() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();
  const initialState = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState(initialState);
  const [deck, setDeck] = useState({});

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
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    });
  }
  async function handleCancel() {
  history.push(`/decks/${deckId}`);
}
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createCard(
      deckId,
      { ...newCard },
      abortController.signal
    );
    history.go(0);
    setNewCard(initialState);
    return response;
  }

  async function handleDone() {
    history.push(`/decks/${deckId}`);
  }

  if (!cardId) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{deck.name}: Add Card</h2>
          <div className="form-group">
            <label>Front</label>
            <textarea
              id="front"
              name="front"
              className="form-control"
              onChange={handleChange}
              type="text"
              value={newCard.front}
            />
          </div>
          <div className="form-group">
            <label>Back</label>
            <textarea
              id="back"
              name="back"
              className="form-control"
              onChange={handleChange}
              type="text"
              value={newCard.back}
            />
            <button
              className="btn btn-secondary mx-1"
              onClick={() => handleDone()}
            >
              Done
            </button>
            <button className="btn btn-primary mx-1" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{deck.name}: Edit Card</h2>
          <div className="form-group">
            <label>Front</label>
            <textarea
              id="front"
              name="front"
              className="form-control"
              onChange={handleChange}
              type="text"
              value={newCard.front}
            />
          </div>
          <div className="form-group">
            <label>Back</label>
            <textarea
              id="back"
              name="back"
              className="form-control"
              onChange={handleChange}
              type="text"
              value={newCard.back}
            />
            <button
              className="btn btn-secondary mx-1"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-primary mx-1" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Form;
