import TodoList from './TodoList';
import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const itemList = [
    {id: 'a', value: 'learn react', complete: false},
    {id: 'b', value: 'call bob', complete: false},
    {id: 'c', value: 'go shopping',complete: false},
    {id: 'd', value: 'eat breakfast',complete: false},
    {id: 'e', value: 'grow avocados',complete: false}
];
const LOCAL_STORAGE_KEY = 'todoApp.items'

function App() {
    const [items, setItems] = useState([])
    const [inputText, setInputText] = useState('')

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
    }

    function removeItems(item) {
        return function() {
            setItems(items.filter(removedItem => removedItem !== item))
        }
    }

    function clearItems() {
        setItems([])
    }

    function checkedItem(id) {
        //have copy of current todoslist
         const newTodos = [...items]
         const todo = newTodos.find(items => items.id === id)
         todo.complete = !todo.complete
        console.log(todo)

    }

    function handleCheckedItem(item) {
        return null
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

            <TodoList  listItems={items} removeItems={removeItems} checkedItem={checkedItem}/>
        </>

    )
}


export default App;
