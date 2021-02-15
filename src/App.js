import TodoList from './TodoList';
import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import ListItem from "./ListItem";


const initForm = {
    task: '',
    date: moment().format("YYYY-MM-DD")
}


const LOCAL_STORAGE_KEY = 'todoApp.items'

function App() {
    const [items, setItems] = useState([])
    const [sortAsc, setSortAsc] = useState(true)
    const [sortBy, setSortBy] = useState('date')
    const [form, setForm] = useState(initForm)


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
            if (sortBy === 'date') {
                _items.sort((a, b) => a.overdue-b.overdue)
            }
            else if (sortBy === 'name') {
                _items.sort((a, b) => a.value.localeCompare(b.value))
            }

            if (!sortAsc) {
                _items.reverse()
            }
            setItems(_items)
        }
    }, [sortBy, sortAsc])

    function handleFormInput(event) {
        const value = event.target.value
        const name = event.target.name
        setForm({...form, [name]:value})
    }


    function addItems() {
        if (form.task) {
            const _items = [...items, {id: uuidv4(), value: form.task, date: form.date,overdue: moment(form.date).diff(moment(), 'days'), complete: false}]
            setItems(_items)
            setForm(initForm)
        } else {
            alert('Input cannot be blank, please try again.')
        }
    }

    function removeItems(item) {
        setItems(items.filter(removedItem => removedItem !== item))

    }

    function clearItems() {
        setItems([])
    }

    function checkedItem(id) {
            const newTodos = items.map((item) => {
                if (item.id !== id) {
                    return item
                } else {
                    return {...item, complete: !item.complete}
                }
            })
            setItems(newTodos)
    }


    function sortList(by) {
        if (sortBy === by) {
            setSortAsc(!sortAsc)
        } else {
            setSortBy(by)
            setSortAsc(true)
        }
    }


    return (
        <>
            <header>
                <h2 className="app-title">Todo List</h2>
                <div className="wrapper">
                    <span className="date sort-button" onClick={() => {
                        sortList('date')
                    }}>
                        <i className="fas fa-clock fa-2x"/>
                    </span>
                    <span className="name sort-button" onClick={() => {
                        sortList('name')
                    }}>
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
        </>

    )
}


export default App;
