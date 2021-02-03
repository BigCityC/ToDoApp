import React, {useState} from "react";
import ListItem from "./ListItem"
//set up an initial state for the itemList

//set up use effect hooks to edit the list once it initializes

export default function TodoList({ listItems, checkedItem, removeItems }) {


    return (
        <main>
            <ul id="myUL">
                {listItems.map((item) => (
                    //the onclick runs for every item in the list because of the map function...
                    <ListItem item={item} checkedItem={checkedItem} removeItems={removeItems} />
                ))}
            </ul>
        </main>
    )
}
