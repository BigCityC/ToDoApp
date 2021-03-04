import React, {useState} from "react";
import './ListItem.css';
import moment from "moment";
import { FaCheck, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Pluralize from 'react-pluralize'




export default function ListItem({ item, setItems, handleListComplete, api}) {

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
        api.put(`item/${id}`,
            {
                value: form.listText,
                date :form.listDate,
                overdue: moment(item.date).diff(moment(), 'days')
            })
            .then(function (res) {
                setItems(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function removeItem(item){
        api.delete(`/item/${item.id}`)
            .then(res => {
                setItems(res.data)
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    function checkedItem(id) {
        api.put(`item/${id}/complete`,
            {complete:!item.complete})
            .then((res)=>{
                setItems(res.data)
                handleListComplete(res.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <li key={item.id}>
            {item.complete && <FaCheck className="list-check"/>}
            {editable ?
                <div className="list-item editable">
                    {form.listText.length <= 23 ?
                        <input type="text" value={form.listText} name="listText" onChange={handleInputChange}/>
                        :
                        <textarea value={form.listText} name="listText" onChange={handleInputChange}/>
                    }

                    <input className="date_input" id="date-input" type="date" value={form.listDate} name="listDate" onChange={handleInputChange}/>
                </div>

                :
                <div className="list-item not_editable">
                    <p className={item.complete ? "checked" : ""} onClick={() =>
                    {
                        checkedItem(item.id)
                    }}>
                        {item.value}
                    </p>

                    {(item.overdue < 0) ?
                        <span className="overdue date_item">
                            Overdue by <Pluralize singular={'day'} count={Math.abs(item.overdue)}/>
                        </span>
                    :
                        <span className="ontime date_item">
                             {`Due:  ${moment(item.date).format("MMM Do, YYYY")}`}
                        </span>
                    }

                </div>
            }
            <div className="list-buttons">
                <span className="list-action list-edit" onClick={() => editItems()}>
                    <FaEdit className="icon" size={20} title="Edit" />

                </span>
                <span className="list-action list-delete"  onClick={() => {removeItem(item)}}>
                    <FaTrashAlt className="icon" size={20} title="Delete" />
                </span>
            </div>
        </li>
    )
}