import TodoList from './TodoList';
import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";


const initForm = {
    task: '',
    date: moment().format("YYYY-MM-DD")
}


const LOCAL_STORAGE_KEY = 'todoApp.items'

function App() {
    const [items, setItems] = useState([])
    const [sort_asc, setSort] = useState(true)
    const [form, setForm] = useState(initForm)
    //it has to be in this format for the input date to show up


    useEffect(() => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY)
        const storedItems = JSON.parse(data)
        if (storedItems) setItems(storedItems)
    }, [])


    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    }, [items])

    useEffect(() => {
        if (items.length) {
            const _items = [...items]
            _items.sort((a, b) => a.value.localeCompare(b.value))
            if (!sort_asc) _items.reverse()
            setItems(_items)
        }
    }, [sort_asc])

    function handleFormInput(event) {
        const value = event.target.value
        const name = event.target.name

        setForm({...form, [name]:value})
    }


    function addItems() {
        if (form.task) {
            const _items = [...items, {id: uuidv4(), value: form.task, date: form.date, overdue:false, complete: false}]
            _items.sort((a, b) => a.value.localeCompare(b.value))
            if (!sort_asc) _items.reverse()
            setItems(_items)
            setForm(initForm)
        } else {
            alert('Input cannot be blank, please try again.')
        }
    }

    function toggleSort() {
        setSort(!sort_asc)
    }

    function removeItems(item) {
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
                    <span className="date sort-button">
                        <i className="fas fa-clock fa-2x"/>
                    </span>
                    <span className="name sort-button" onClick={toggleSort}>
                        <i className="fas fa-sort fa-2x"/>
                    </span>
                <div className="input-text">
                    <input id="todolist-input"
                           placeholder="Input a Task Here..."
                           type="text"
                           onChange={handleFormInput}
                           value={form.task}
                           name='task'
                    />
                    <input id="date-input" type="date" value={form.date} name='date' onChange={handleFormInput}/>
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
