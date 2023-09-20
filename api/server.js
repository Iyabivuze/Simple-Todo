require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./db/connect')
const Todo = require('./models/TodoSchema')
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())

// Getting all todos
app.get('/todo', async (req, res)=> {
    const todos = await Todo.find()
    res.status(200).json(todos)
})

// Creating a new todo
app.post('/todo/new',  async (req, res) => {

    try {
        const newTodo = new Todo({
            todo: req.body.todo
        })
        await newTodo.save()
        res.status(200).json(newTodo)
    } catch (error) {
        res.json(error)
    }
})

// Deleting the todo
app.delete('/todo/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deleteTodo = await Todo.findByIdAndDelete(id)
        if(!deleteTodo){
            res.status(404).json({error: "Task not found"})
        }
        res.json(deleteTodo)
    } catch (error) {
        res.status(500).json({error: "Server down"}) 
    }
})

// Updating the completed tasks/toggling
app.get('/todo/complete/:id', async (req, res) => {
    try {
        const {id} = req.params
        const todo = await Todo.findById(id)
        todo.completed = !todo.completed
        await todo.save()
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Listening to the server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening to the port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()