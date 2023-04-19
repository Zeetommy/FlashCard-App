import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import  Form  from "../Components/FormComponent";
function AddCard() {

  const { deckId } = useParams();
  const initialState = {
    front: "",
    back: "",
  };
  const [newCard, setNewCard] = useState(initialState);
  const [deck, setDeck] = useState({});
  
  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Add Card</li>
      </ol>
        <Form />
      </div>
  );
}

export default AddCard;
