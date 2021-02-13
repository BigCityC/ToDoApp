import React from "react";
import ListItem from "./ListItem"


export default function TodoList({items, checkedItem, removeItems, setItems}) {


    return (
        <main>
            <ul id="myUL">
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
