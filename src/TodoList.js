import React, {useState} from "react";
import ListItem from "./ListItem"
//set up an initial state for the itemList

//set up use effect hooks to edit the list once it initializes


export default function TodoList({items, checkedItem, removeItems, setItems }) {


    return (
        <main>
            <div>
            <ul id="myUL">
                {items.map((item, index) => (
                    //the onclick runs for every item in the list because of the map function...
                    <ListItem
                        key={index}
                        item={item}
                        items={items}
                        checkedItem={checkedItem}
                        removeItems={removeItems}
                        setItems={setItems}
                    />
                ))}
            </ul>
            </div>
        </main>
    )
}
