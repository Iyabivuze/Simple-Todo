import './App.css';
import{useState, useEffect} from 'react'
const App = () => {

  // Getting the backend url

  const API_BASE = "http://localhost:5000"


  const [myTodos, setMyTodos] = useState([])
  const [popup, setPopup] = useState(false)
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos()
    console.log(myTodos)
  }, [])

 const getTodos = async () => {
    try {
      const res = await fetch(API_BASE + "/todo")
      const data = await res.json()
      
      console.log("Todos fetched", data)
      setMyTodos(data)
    } catch (error) {
      console.log(error)
    }
 }

 const addTodo = async() => {
    const data = await fetch(API_BASE + "/todo/new/", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body:JSON.stringify({
          todo: newTodo
        })
    }).then(res => res.json())
    setMyTodos([...myTodos, data])
    setPopup(false)
    setNewTodo("")
 }


//  Complete todo
 const completeTodo = async (id) => {
  try {
    const res = await fetch(API_BASE + "/todo/complete/" + id)
    const data = await res.json()
    
    setMyTodos(myTodos => myTodos.map(todo => {
      if(todo._id === data._id){
        todo.completed = data.completed;
      }
      return todo
    }))
  } catch (error) {
      console.log(error)
  }
 }


//  Delete my todo

  const deleteTodo = async(id) => {
    const data = await fetch(API_BASE + `/todo/delete/${id}`, {method : "DELETE"})
        .then(res => res.json())

    setMyTodos(myTodos => myTodos.filter(todos => (
      todos._id !== data._id
    )))
  }



  return (
    <div className="App">
      <h1>Welcome, Dieudonne</h1>
      <h4>Your Tasks</h4>


      {myTodos.map(todo => (

        <div className={
          `'todos' ${todo.completed ? 'isComplete':'' }`
          }key={todo._id} onClick={() => completeTodo(todo._id)}>

          <div className="todo">
            <div className="checkBox"></div>

            <div className="texts">{todo.todo}</div>

            <div className="delete"
              onClick={() => deleteTodo(todo._id)}
            >x</div>

          </div>

          
        </div>

      ) )}

  <div className='addPopup' onClick={() => setPopup(true)}>+</div>
          {popup ? (
            <div className="myPopup">
              <div className='closePopup'
                onClick={() => setPopup(false)}
              >x</div>
              <div className='content'>
                <h3>Add To Do</h3>
                <input 
                  className='addTodoInput'
                  placeholder='Add a todo'
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <div className="button"
                  onClick={addTodo}
                >Create Task</div>

              </div>
            </div>
          ): ''}
    </div>
  );
}

export default App;
