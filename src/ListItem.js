import React, {useState} from "react";
import './ListItem.css';
import {differenceInDays, format} from 'date-fns';
import { FaCheck, FaEraser, FaEdit } from 'react-icons/fa';
import Pluralize from 'react-pluralize'



export default function ListItem({ item, items, setItems, checkedItem, removeItems}) {

    const initForm = {
        listText: item.value,
        listDate: item.date,
    }

    const [editable, setIfEditable] = useState(false)
    const [form, setForm] = useState(initForm)

    function editItems() {
        setIfEditable(!editable)
        item.value = form.listText
        item.date = form.listDate
        handleToggleComplete(item.id)
    }

    function handleInputChange(event) {
        const value = event.target.value
        const name = event.target.name
        setForm({...form, [name]: value})
    }

    function handleToggleComplete(id) {
        const updatedList = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    value: form.listText,
                    date: form.listDate,
                    overdue: differenceInDays(new Date(item.date), new Date()),
                }
            } else {
                return item
            }
        })
        setItems(updatedList)

    }

    return (
        <li key={item.id}>
            {item.complete && <FaCheck className="list-check"/>}
            {editable ?
                <div className="editable">
                    <input type="text" value={form.listText} name="listText" onChange={handleInputChange}/>
                    <input className="date_input" id="date-input" type="date" value={form.listDate} name="listDate" onChange={handleInputChange}/>
                </div>

                :
                <div className="not_editable">
                    <p className={item.complete ? "checked" : ""} onClick={() => {checkedItem(item.id)}}>
                        {item.value}
                    </p>

                    {(item.overdue < 0) ?
                        <span className="overdue date_item">
                            Overdue by <Pluralize singular={'day'} count={Math.abs(item.overdue)}/>
                        </span>
                    :
                        <span className="ontime date_item">
                            {`Due:  ${format(new Date(), "MMM do, yyyy")}`}
                        </span>
                    }

                </div>
            }
            <div className="list-buttons">
                <FaEdit className="list-edit" title="Edit" onClick={() => editItems()} />
                <FaEraser className="list-delete" title="Delete" onClick={() => {removeItems(item)}} />
            </div>



        </li>
    )
}