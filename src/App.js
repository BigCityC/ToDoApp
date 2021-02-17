import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import {format, differenceInDays} from 'date-fns';
import { FaPlus, FaTrashAlt, FaSort, FaClock } from 'react-icons/fa';
import ListItem from "./ListItem";


const initForm = {
    task: '',
    date: format(new Date(), 'yyyy-MM-dd')
}

console.log(initForm)
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
            const _items = [...items, {id: uuidv4(), value: form.task, date: form.date, overdue: differenceInDays(new Date(form.date), new Date()), complete: false}]
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
                <h2 className="title">Todo List</h2>
                <span className="clear" title="Clear All" onClick={clearItems}>
                    <FaTrashAlt size={20}/>
                </span>
                <div className="wrapper">
                    <span className={`sort-button date ${sortBy === 'date' && "highlight"}`} onClick={() => {
                        sortList('date')
                    }}>
                        <FaClock size={30} />
                    </span>
                    <span className={`sort-button name ${sortBy === 'name' && "highlight"}`} onClick={() => {
                        sortList('name')
                    }}>
                        <FaSort size={30}/>
                    </span>
                <div className="input-wrapper">
                    <div className="input-bar">
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
                        <span className="add" title="Add" onClick={addItems}>
                            <FaPlus size={20}/>
                        </span>
                    </div>
                </div>
                </div>
            </header>

            <main>
                    <ul>
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