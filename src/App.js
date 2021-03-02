import React, {useState, useEffect} from 'react'
import './App.css';
import {v4 as uuidv4} from 'uuid';
import moment from "moment";
import {FaPlus, FaSort, FaClock} from 'react-icons/fa';
import ListItem from "./ListItem";
import axios from "axios";


const currentDay = moment('2021, 03, 28').format("YYYY-MM-DD")
const initForm = {
    task: '',
    date: currentDay,
}


const api = axios.create({
    baseURL: 'http://localhost:5000/api/'
})

function App() {
    const [items, setItems] = useState([])
    const [sortAsc, setSortAsc] = useState(true)
    const [sortBy, setSortBy] = useState('date')
    const [form, setForm] = useState(initForm)

    const getItems = () => {
        api.get('/items/')
            .then(function (res) {
                setItems(res.data)
            })
            .catch(function (error) {
                console.log(error.message);
            })
    }

    useEffect(() => {
        getItems()
    }, [])

    // useEffect(() => {
    //     let timer;
    //     if (items) {
    //         timer = setTimeout(() => {
    //             // const updatedList = items.map((item) => ({
    //             //     ...item,
    //             //     overdue: moment(item.date).diff(moment(), 'days')
    //             // }))
    //             setItems({overdue: moment("2021, 03, 01").diff(moment(), 'days')})
    //             console.log("timer tuns")
    //         }, 100);
    //     }
    //     return () => clearInterval(timer);
    // }, [])


    useEffect(() => {
        if (items.length) {
            const _items = [...items]
            if (sortBy === 'date') {
                _items.sort((a, b) => a.overdue - b.overdue)
            } else if (sortBy === 'name') {
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
        setForm({...form, [name]: value})
    }


    function addItems() {
        const item = {
                    id: uuidv4(),
                    value: form.task,
                    date: form.date,
                    overdue: moment(form.date).diff(moment(currentDay), 'days'),
                    complete: false
                };
        api.post('/items', { item })
            .then((res) => {
                setItems(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        setForm(initForm)
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
                </div>
                <div className="input-wrapper input-buttons">
                        <span
                            className={`button sort ${sortBy === 'date' && "highlight"}`}
                            onClick={() => {
                                sortList('date')
                            }}>
                                <FaClock size={30}/>
                        </span>

                    <span
                        className="button add" title="Add"
                        onClick={addItems}>
                                <FaPlus size={25}/>
                        </span>

                    <span
                        className={`button sort ${sortBy === 'name' && "highlight"}`}
                        onClick={() => {
                            sortList('name')
                        }}>
                                <FaSort size={30}/>
                        </span>
                </div>
            </header>

            <main>
                <ul>
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            item={item}
                            checkedItem={checkedItem}
                            setItems={setItems}
                            api={api}
                        />
                    ))}
                </ul>
            </main>
        </>

    )
}


export default App;