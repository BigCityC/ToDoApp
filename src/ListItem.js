import React, {useState} from "react";

export default function ListItem({ item, items, setItems, checkedItem, removeItems}) {
    const [listText, setListText] = useState('')
    const [editable, setIfEditable] = useState(false)

    function editItems() {
        setIfEditable(!editable)
        setListText(item.value)
        handleToggleComplete(item.id)
    }


    function handleInputChange(e) {
        setListText(e.target.value)

    }

    function handleToggleComplete(id) {
        const updatedList = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    value: listText,
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
            {editable ? <input type="text" value={listText} onChange={handleInputChange}/>

                :   <p
                    className={item.complete ? "checked" : ""}
                    onClick={() => {checkedItem(item.id)}}
                >
                    {item.value}
                </p>
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