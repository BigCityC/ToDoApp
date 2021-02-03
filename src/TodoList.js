import React, {useState} from "react";
import ListItem from "./ListItem"
//set up an initial state for the itemList

//set up use effect hooks to edit the list once it initializes


export default function TodoList({listItems, checkedItem, removeItems, editItems, sortList }) {


    return (
        <main>
            <div>
            <ul id="myUL" {...sortList()}>
                {listItems.map((item) => (
                    //the onclick runs for every item in the list because of the map function...
                    <ListItem item={item} checkedItem={checkedItem} removeItems={removeItems} />
                ))}
            </ul>
            </div>
        </main>
    )
}
