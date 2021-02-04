import React, {useState, useEffect} from "react";
import ListItem from "./ListItem"
//set up an initial state for the itemList

//set up use effect hooks to edit the list once it initializes


export default function TodoList({items, checkedItem, removeItems, setItems }) {

    //if sort is true, sort is ascending, if false, its descending
    const [sort_asc, setSort] = useState('true')

    useEffect(() => {
        sort_asc ? items.sort((a,b) => (a.value > b.value) ? 1 : -1)
            :items.sort((a,b) => (a.value < b.value) ? 1 : -1)
    },[items,sort_asc])

    function toggleSort() {
        setSort(!sort_asc)
        console.log(sort_asc)
    }

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
