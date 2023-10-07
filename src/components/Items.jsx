import React from 'react';
import Item from './Item';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Items = () => {
    const [items, setItems] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate])

    const getTodos = async () => {
        const todos = await fetchData();
        setItems(todos);
    };

    const fetchData = async () => {
        const data = (await fetch("http://localhost:5000/api/items",
            {
                headers: {
                    "Authorization": user ? "Bearer " + user.token : ""
                }
            })).json();
        return data;
    };

    const addItem = async () => {
        try {
            await fetch("http://localhost:5000/api/items", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user ? "Bearer " + user.token : ""
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
                    "Authorization": user ? "Bearer " + user.token : ""
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
        await fetch(`http://localhost:5000/api/items/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": user ? "Bearer " + user.token : ""
            }
        });

        getTodos();
    };

    const formatDate = (date) => {
        let formated = ""
        let abbreviation = ""
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);

        //remove leading zeroes
        if(Number(day) < 10)
        {
            day = day.slice(1);
        }

        //convert to name abbreviation
        switch (month) {
            case ("01"):
                abbreviation = "Jan";
                break;
            case ("02"):
                abbreviation = "Feb";
                break;
            case ("03"):
                abbreviation = "Mar";
                break;
            case ("04"):
                abbreviation = "Apr";
                break;
            case ("05"):
                abbreviation = "May";
                break;
            case ("06"):
                abbreviation = "Jun";
                break;
            case ("07"):
                abbreviation = "Jul";
                break;
            case ("08"):
                abbreviation = "Aug";
                break;
            case ("09"):
                abbreviation = "Sep";
                break;
            case ("10"):
                abbreviation = "Oct";
            case ("11"):
                abbreviation = "Nov";
                break;
            case ("12"):
                abbreviation = "Dec";
                break;
        }

        const currentYear = new Date().getFullYear();

        if(Number(year) < Number(currentYear))
        {
            formated = day + "/" + month + "/" + year
        }
        else
        {
            formated = abbreviation + " " + day;
        }


        return formated
    }

    useEffect(() => {
        if (user) {
            getTodos();
        }
    });

    return (
        <div className="container">
            <div className="form">
                <div className='form-group'>
                    <h3>Date</h3>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    ></input>
                </div>
                <div className='form-group'>
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
                            date={formatDate(i.date)}
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