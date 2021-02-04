import React from "react";
import ListItem from "./ListItem"
//set up an initial state for the itemList

//set up use effect hooks to edit the list once it initializes


export default function TodoList({items, checkedItem, removeItems, setItems }) {


    return (
        <main>
            <ul id="myUL">
                <span className="sort-button">
                    <i className="fas fa-sort fa-2x"/>
                </span>
                {items.map((item, index) => (
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
        </main>
    )
}
