import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck(){
    const history = useHistory()
    const initialState = {
        name: "",
        description: "",
    }

    const [newDeck, setNewDeck] = useState(initialState) 
}