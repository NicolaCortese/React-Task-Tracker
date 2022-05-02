import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const TaskDetails = () => {
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState({})
  const [error, setError] = useState(null)
  
  const params = useParams();

  useEffect(() => {
    const findTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
      const data = await res.json()
      setTask(data)
      setLoading(false)
    }

    findTask()
  }, [])

  

  return loading ? (
    <p>Loading...</p>
  ) : (
      <div>
        <h3>{task.text}</h3>
        <p>{task.details}</p>
        <p>To be completed by: {task.day}</p>
      </div>
    )
}

export default TaskDetails