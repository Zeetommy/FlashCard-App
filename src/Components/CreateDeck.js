import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { createDeck } from "../utils/api/index"

function CreateDeck(){
    const history = useHistory()
    const initialState = {
        name: "",
        description: "",
    }

    const [newDeck, setNewDeck] = useState(initialState) 
    function handleChange({ target }){
        setNewDeck({
            ...newDeck,
            [target.name]: target.value,
        })
    }

    async function handleSubmit(event){
        event.prevetDefault()
        const abortController = new AbortController()
        const response = await createDeck(
            {...newDeck},
            abortController.signal
        )
        history.push("/")
        return response
    }

    async function handleCancel(){
        history.push("/")
    }

    return (
        <div>
            <ol>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>Create Deck</li>
            </ol>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <h1>Create Deck</h1>
                <div>
                    <label>Name</label>
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={newDeck.name}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        id="descripton"
                        name="description"
                        type="text"
                        onChange={handleChange}
                        value={newDeck.description}
                    />
                </div>
                <button onClick={() => handleCancel()}>
                    Cancel
                </button>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}
export default CreateDeck