import React from 'react'

//set up an initial state for the itemList

//set up use effect hooks to edit the list once it initializes

export default function TodoList({ listItems, checkedItem, removeItems }) {


    return (
        <main>
            <ul id="myUL">
                {listItems.map((item) => (
                    //the onclick runs for every item in the list because of the map function...
                    <li key={item.id} className={item.complete ? "checked": ""} onClick={checkedItem(item.id)}>
                        <p>{item.value}</p>
                        <span className="delete" onClick={removeItems(item)}>
                             <i className="fas fa-times"/>
                         </span>
                    </li>

                ))}

            </ul>
        </main>
    )
}

// sorting
// dates
// make items editable
