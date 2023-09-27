import React from 'react';
import Header from './Header';
import Item from './Item';
import { useState, useEffect } from "react";


const Items = () => {
    const [items, setItems] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const getTodos = async () => {
        const todos = await fetchData();
        setItems(todos);
    };

    const fetchData = async () => {
        const data = (await fetch("http://localhost:5000/api/items")).json();
        return data;
    };

    const addItem = async () => {
        try {
            await fetch("http://localhost:5000/api/items", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: date,
                    description: description,
                }),
            }).then((res) => console.log(res.json()));
        } catch (error) {
            console.log(error);
        }
    };

    const updateItem = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/items/${id}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: date,
                    description: description,
                }),
            }).then((res) => console.log(res.json()));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (id) => {
        console.log(id);
        await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });

        getTodos();
    };

    useEffect(() => {
        getTodos();
    });

    return (
        <div className="container">
            <div className="form">
                <div>
                    <h3>Date</h3>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    ></input>
                </div>
                <div>
                    <h3>Description</h3>
                    <input
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    ></input>
                </div>
                <button onClick={addItem}>Add</button>
            </div>
            {items.map((i) => {
                return (
                    <div key={i._id}>
                        <Item
                            id={i._id}
                            date={i.date}
                            description={i.description}
                            onDelete={deleteItem}
                            onUpdate={updateItem}
                        ></Item>
                    </div>
                );
            })}
        </div>
    )
}

export default Items