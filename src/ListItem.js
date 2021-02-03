import React, {useState} from "react";
//when edit button clicked,
//input box comes up and lets you edit the list item value
//input box only shows when edit button is clicked
// if edit button is clicked show the input box until enter key

// when you hit enter it saves it
//update items state
// sorting by name
// make items editable inline
export default function ListItem({ item, checkedItem, removeItems}) {
    const [listText, setListText] = useState('')
    const [editable, setIfEditable] = useState(false)

    function editItems() {
        // const itemToEdit = item.value
        // setInputText(itemToEdit)
        // const index = items.findIndex((el) => el.id === item.id)
        // removeItems(items[index])
        setIfEditable(!editable)
        setListText(item.value)




    }

    return (
        <li key={item.id}>
            {item.complete && <i className="fas fa-check"/>}
            {editable ? <input type="text" value={listText} />
                :   <p
                    className={item.complete ? "checked" : ""}
                    onClick={() => {checkedItem(item.id)}}
                >
                    {item.value}
                </p>
            }

            <div className="btn-spacing">
            <span className="edit" onClick={() => {

                editItems()
            }}>
                <i className="fas fa-edit"/>
            </span>
                <span className="delete" onClick={() => {removeItems(item)}}>
                 <i className="fas fa-times"/>
             </span>
            </div>
        </li>
    )
}