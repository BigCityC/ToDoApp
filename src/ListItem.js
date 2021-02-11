import React, {useState} from "react";
import moment from "moment";


export default function ListItem({ item, items, setItems, checkedItem, removeItems, date}) {

    const initForm = {
        listText: item.value,
        listDate: item.date
    }

    const [editable, setIfEditable] = useState(false)
    const [overdue, setOverdue] = useState(false)
    const [form, setForm] = useState(initForm)


    function editItems() {
        setIfEditable(!editable)
        item.value = form.listText
        item.date = form.listDate
        handleToggleComplete(item.id)
    }

    function handleListChange(event) {
        const listText = event.target.value
        const inputName = event.target.name

        setForm({...form, [inputName]: listText})
    }

    function handleToggleComplete(id) {
        const updatedList = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    value: form.listText,
                    date: form.listDate,
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
                    <input type="text" value={form.listText} name="listText" onChange={handleListChange}/>
                    <input className="date_input" id="date-input" type="date" value={form.listDate} name="listDate" onChange={handleListChange}/>
                </div>

                :
                <div className="not_editable">
                    <p className={item.complete ? "checked" : ""}
                       onClick={() => {checkedItem(item.id)}}>
                        {item.value}
                    </p>
                    {overdue ?
                        <span className="overdue date_item">
                            {console.log(item.date)}
                            {`OverDue by ${item.date - moment()} days.`}
                        </span>
                    :
                        <span className="ontime date_item">
                            {`Due:  ${moment(item.date, "YYYY MM Do").format('LL')}`}
                        </span>

                    }

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

// use epoch for claculating and sorting by time
// use times useEffect to chech if overdue and display by how much