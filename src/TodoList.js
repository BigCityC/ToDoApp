import React from "react";
import ListItem from "./ListItem"


export default function TodoList({items, checkedItem, removeItems, setItems, toggleSort }) {


    return (
        <main>
            <ul id="myUL">
                <span className="sort-button" onClick={toggleSort}>
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
