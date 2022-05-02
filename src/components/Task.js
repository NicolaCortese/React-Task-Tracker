import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Task = ({ task, onDelete, toggleReminder }) => {
  return (
    <div className={task.reminder ? "task reminder" : "task"} onDoubleClick={() => toggleReminder(task)}>
      <h3>{task.text}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)} />
      </h3>
      <p>{task.day}</p>
      <p><Link to={ `/task/${task.id}`}>View Details</Link></p>
    </div>
  )
}

export default Task
