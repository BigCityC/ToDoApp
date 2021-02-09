import TodoList from './TodoList';
import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';



const LOCAL_STORAGE_KEY = 'todoApp.items'

function App() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [inputText, setInputText] = useState('')
    const [sort_asc, setSort] = useState(true)

    useEffect(() => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY)
        const storedItems = JSON.parse(data)
        if (storedItems) setItems(storedItems)
        setLoading(false)
    }, [])

    useEffect(() => {
        console.log(items)
        !loading && localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    }, [items])

    useEffect(() => {
        if (items.length) {
            const _items = [...items]
            _items.sort((a, b) => a.value.localeCompare(b.value))
            if (!sort_asc) _items.reverse()
            setItems(_items)
        }
    }, [sort_asc])

    function handleInput(event) {
        setInputText(event.target.value)
    }

    function addItems() {
        if (inputText) {
            const _items = [...items, {id: uuidv4(), value: inputText, complete: false}]
            _items.sort((a, b) => a.value.localeCompare(b.value))
            if (!sort_asc) _items.reverse()
            setItems(_items)
            setInputText( '')
        } else {
            alert('Input cannot be blank, please try again.')
        }
    }

    function toggleSort() {
        setSort(!sort_asc)
    }

    function removeItems(item) {
        console.log(item)
        setItems(items.filter(removedItem => removedItem !== item))

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
                <div className="wrapper">
                <div className="input-text">
                    <input id="todolist-input"
                           placeholder="Input a Task Here..."
                           type="text"
                           onChange={handleInput}
                           value={inputText}
                    />
                    <input id="date-input" type="date"/>
                </div>
                <div className="input-buttons">
                    <span className="add btn" id="todoListAdd" onClick={addItems}>
                        <p><i className="fas fa-plus"/>Add</p>
                    </span>

                    <span className="clear btn" id="todoListClear" onClick={clearItems}>
                        <p><i className="fas fa-eraser"/>Clear All</p>
                    </span>
                </div>
                </div>
            </header>


            <TodoList  items={items}
                       removeItems={removeItems}
                       checkedItem={checkedItem}
                       setItems={setItems}
                       toggleSort={toggleSort}
            />

        </>

    )
}


export default App;
