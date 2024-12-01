import { Outlet } from "react-router"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="view">
      <div className="sidebar">
        <h1>Trucker Mex</h1>
        <Navbar></Navbar>
        
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default App
