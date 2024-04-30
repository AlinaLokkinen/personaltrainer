import './App.css'
import Navbar from './Navbar'
import Home from './Components/Home'
import Customers from './Components/Customers'
import Trainings from './Components/Trainings'
import Calendar from './Components/Calendar'
// import { Link, Outlet } from 'react-router-dom'


function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      {/* <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/customers"} style={{marginLeft: 15}}>Customers</Link>
          <Link to={"/trainings"} style={{margin: 15}} >Trainings</Link>
          <Link to={"/calendar"}>Calendar</Link>
      </nav>
      <Outlet /> */}
    </>
  )
}

export default App
