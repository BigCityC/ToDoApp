import React, {useState, useEffect} from "react";
import moment from "moment";
import Pluralize from 'react-pluralize'


export default function ListItem({ item, items, setItems, checkedItem, removeItems, date}) {

    // const initForm = {
    //     listText: item.value,
    //     listDate: item.date
    // }

    const [editable, setIfEditable] = useState(false)
    const [listText, setListText] = useState(item.value)
    const [listDate, setListDate] = useState(date)
    const [overdue, setOverdue] = useState(false)
    // const [form, setForm] = useState(initForm)

    useEffect(() => {
        console.log('useEffect runs')
        if (items.length) {
            const _items = [...items]
            const updatedList = _items.map((item) => {
                if (item.date < moment().valueOf() && millisecondsToDays(item.date) !== 0) {
                    return {
                        ...item,
                        overdue: true,
                    }
                } else {
                    return item
                }
            })
        setItems(updatedList)
        }

    },[])

    function editItems() {
        setIfEditable(!editable)
        // item.value = form.listText
        // item.date = form.listDate
        setListText(item.value)
        setListDate(moment(item.date).valueOf())
        console.log('item.value: ' + item.value + ' ' + item.date)
        console.log('listitem: ' + listText + ' ' + listDate)
        handleToggleComplete(item.id)
    }

    function handleInputChange(e) {
        setListText(e.target.value)
    }

    function handleDateChange(e) {
        setListDate(e.target.value)

    }
    

    // function handleInputChange(event) {
    //     const value = event.target.value
    //     const name = event.target.name
    //
    //     setForm({...form, [name]: value})
    // }

    function handleToggleComplete(id) {
        const updatedList = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    // value: form.,
                    // date: form.listDate,
                    value: listText,
                    date: listDate,
                }
            } else {
                return item
            }
        })
        setItems(updatedList)

    }

    function millisecondsToDays(date) {
        return Math.floor(moment.duration(moment().valueOf()-moment(date).valueOf()).asDays())
    }

    return (
        <li key={item.id}>
            {item.complete && <i className="fas fa-check"/>}
            {editable ?
                <div className="editable">
                    <input type="text" value={listText} name="listText" onChange={handleInputChange}/>
                    <input className="date_input" id="date-input" type="date" value={listDate} name="listDate" onChange={handleDateChange}/>
                    {/*<input type="text" value={form.listText} name="listText" onChange={handleListChange}/>*/}
                    {/*<input className="date_input" id="date-input" type="date" value={form.listDate} name="listDate" onChange={handleListChange}/>*/}
                </div>

                :
                <div className="not_editable">
                    <p className={item.complete ? "checked" : ""}
                       onClick={() => {checkedItem(item.id)}}>
                        {item.value}
                    </p>

                    {item.overdue ?
                        <span className="overdue date_item">
                            Overdue by <Pluralize singular={'day'} count={millisecondsToDays(item.date)}/>

                        </span>
                    :
                        <span className="ontime date_item">
                            {`Due:  ${moment(item.date, "x").format("MMM Do YYYY")}`}
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