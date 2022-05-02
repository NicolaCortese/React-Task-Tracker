import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import About from './components/About';
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';

function App() {
  const [tasks,setTasks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    return data
  } 
    
  // Show Add Task Form
  const toggleForm = () => {
    setShowAddForm(!showAddForm)
    
  }
  
  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (toggledTask) => {
    const res = await fetch(`http://localhost:5000/tasks/${toggledTask.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...toggledTask, reminder: !toggledTask.reminder})
    })
    const data = await res.json()
    setTasks(tasks.map((task) => 
      task.id === data.id ? {...task, reminder: data.reminder } : task
    ))
  }
  
  return (
    <Router>
      <div className="container">
        <Header toggleForm={toggleForm} showForm={showAddForm}/>
          <Routes>
            <Route path='/' element={
              <>
                {showAddForm && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} toggleReminder={toggleReminder} />
                : 'All tasks are completed, grab a coffee'}
              </>
            }/>
            <Route path='/about' element={<About />} />
            <Route path='/task/:id' element={<TaskDetails />} />
          </Routes> 
        <Footer />
      </div>
    </Router>
  );
}

export default App;
