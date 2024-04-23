import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  
  return (
    <>
      <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/customers"} style={{marginLeft: 15}}>Customers</Link>
          <Link to={"/trainings"} style={{margin: 15}} >Trainings</Link>
          <Link to={"/calendar"}>Calendar</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default App
