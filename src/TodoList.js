import React from 'react'
//set up an initial state for the itemList

//set up use effect hooks to edit the list once it initializes

export default function TodoList({listItems, checkedItem, removeItems, editItems, sortList }) {


    return (
        <main>
            <div>
            <ul id="myUL" {...sortList()}>
                {listItems.map((item) => (
                    //the onclick runs for every item in the list because of the map function...
                    <li key={item.id}>
                        {item.complete && <i className="fas fa-check"/>}
                        <p
                            className={item.complete ? "checked" : ""}
                            onClick={() => {checkedItem(item.id)}}
                        >
                            {item.value}
                        </p>
                        <span className="edit" onClick={() => {
                            editItems(item)
                        }}>
                             <i className="fas fa-edit"/>
                         </span>
                        <span className="delete" onClick={() => {removeItems(item)}}>
                             <i className="fas fa-times"/>
                         </span>
                    </li>
                ))}
            </ul>
            </div>
        </main>
    )
}

// sorting by name
// make items editable inline
