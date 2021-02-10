import React, {useState} from "react";
import moment from "moment";

export default function ListItem({ item, items, setItems, checkedItem, removeItems, date}) {
    const [listText, setListText] = useState('')
    const [editable, setIfEditable] = useState(false)
    const [listDate, setListDate] = useState(date)

    function editItems() {
        setIfEditable(!editable)
        setListText(item.value)
        setListDate(item.date)
        handleToggleComplete(item.id)
    }


    function handleInputChange(e) {
        setListText(e.target.value)
    }

    function handleDateChange(e) {
        setListDate(e.target.value)

    }

    function handleToggleComplete(id) {
        const updatedList = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    value: listText,
                    date: listDate,
                }
            } else {
                return item
            }
        })
        setItems(updatedList)
    }

    return (
        <li key={item.id}>
            {item.complete && <i className="fas fa-check"/>}
            {editable ?
                <div className="editable">
                    <input type="text" value={listText} onChange={handleInputChange}/>
                    <input className="date_input" id="date-input" type="date" value={listDate} onChange={handleDateChange}/>
                </div>

                :
                <div className="not_editable">
                    <p className={item.complete ? "checked" : ""}
                       onClick={() => {checkedItem(item.id)}}>
                        {item.value}
                    </p>
                    <span className="date_item">
                        {`Due:  ${moment(item.date, "YYYY MM Do").format('LL')}`}

                    </span>
                </div>
            }


            <span className="edit" onClick={() => {
                editItems()
            }}>
                <i className="fas fa-edit"/>
            </span>
                <span className="delete" onClick={() => {removeItems(item)}}>
                 <i className="fas fa-times"/>
             </span>
        </li>
    )
}