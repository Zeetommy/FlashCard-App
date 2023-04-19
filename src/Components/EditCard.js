import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Form from "../Components/FormComponent";


function EditCard() {
  const { deckId, cardId } = useParams();
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [card, setCard] = useState(initialDeckState);
  const [deck, setDeck] = useState(initialCardState);
  
  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Card {cardId}</li>
      </ol>
        <Form />
    </div>
  );
}

export default EditCard;
