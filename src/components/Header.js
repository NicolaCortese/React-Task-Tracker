import Button from "./Button"
import { useLocation } from "react-router-dom"

const Header = ({ title, toggleForm, showForm }) => {
  const location = useLocation()
  return (

    <header className="header">
      <h1> {title} </h1>
      {location.pathname === "/" && <Button color ={showForm ? 'red' : 'green'} text={showForm ? 'Hide' : 'Add'} onClick={toggleForm}></Button>}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

export default Header