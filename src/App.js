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
    const [sortNameToggle, setNameSortToggle] = useState(true)
    const [sortDateToggle, setDateSortToggle] = useState(true)
    const [form, setForm] = useState(initForm)


    useEffect(() => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY)
        const storedItems = JSON.parse(data)
        if (storedItems) setItems(storedItems)
    }, [])


    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    }, [items])

    // useEffect(() => {
    //     if (items.length) {
    //         const _items = [...items]
    //         _items.sort((a, b) => a.value.localeCompare(b.value))
    //         if (!sort_asc) _items.reverse()
    //         setItems(_items)
    //     }
    // }, [sort_as])

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

    function sortByName() {
        const _items = [...items]
        let updatedList;
        if (sortNameToggle) {
            updatedList = _items.sort((a, b) => a.value.localeCompare(b.value))
            } else {
                updatedList = _items.reverse()
            }
        setNameSortToggle(!sortNameToggle)
        setItems(updatedList)
        }


    function sortByDate() {
        const _items = [...items]
        let updatedList;
        if (sortDateToggle) {
            updatedList = _items.sort((a, b) => a.overdue-b.overdue)
        } else {
            updatedList = _items.sort((a, b) => b.overdue-a.overdue)
        }
        setDateSortToggle(!sortDateToggle);
        setItems(updatedList)
    }


    return (
        <>
            <header>
                <h2 className="app-title">Todo List</h2>
                <div className="wrapper">
                    <span className="date sort-button" onClick={sortByDate}>
                        <i className="fas fa-clock fa-2x"/>
                    </span>
                    <span className="name sort-button" onClick={sortByName}>
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
            />

        </>

    )
}


export default App;
