import './App.css'
import Navbar from './Navbar'
import Home from './Components/Home'
import Customers from './Components/Customers'
import Trainings from './Components/Trainings'
import Calendar from './Components/Calendar'
import { Routes, Route } from 'react-router-dom/dist'

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
    </>
  )
}

export default App
