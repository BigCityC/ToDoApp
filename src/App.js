import TodoList from './TodoList';
import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';



const LOCAL_STORAGE_KEY = 'todoApp.items'

function App() {
    const [items, setItems] = useState([])
    const [inputText, setInputText] = useState('')
    const [listText, setListText] = useState('')

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedItems) setItems(storedItems)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    }, [items])

    function handleInput(event) {
        setInputText(event.target.value)
    }

    function addItems() {
        setItems([...items, {id: uuidv4(), value: inputText, complete: false}])
        setInputText( '')
    }

    function removeItems(item) {
        console.log(item)
        setItems(items.filter(removedItem => removedItem !== item))

    }

    function editItems(item) {
            const itemToEdit = item.value
            setInputText(itemToEdit)
            const index = items.findIndex((el) => el.id === item.id)
            removeItems(items[index])


    }

    function clearItems() {
        setItems([])
    }

    function checkedItem(id) {
        //have copy of current todoslist

            const newTodos = items.map((item) => {
                if (item.id !== id) {
                    return item
                } else {
                    return {...item, complete: !item.complete}
                }
            })
            setItems(newTodos)

    }

    return (
        <>
            <header>
                <h2 className="app-title">Todo List</h2>
                <div className="input-text">
                    <input id="todolist-input"
                           placeholder="Input a Task Here..."
                           type="text"
                           onChange={handleInput}
                           value={inputText}
                    />
                    <div className="btn-spacing">
                        <span className="add btn" id="todoListAdd" onClick={addItems}>
                            <p><i className="fas fa-plus"/>Add</p>
                        </span>

                        <span className="clear btn" id="todoListClear" onClick={clearItems}>
                            <p><i className="fas fa-eraser"/>Clear All</p>
                        </span>
                    </div>
                </div>
            </header>

            <TodoList  listItems={items} removeItems={removeItems} checkedItem={checkedItem} editItems={editItems}/>
        </>

    )
}


export default App;
