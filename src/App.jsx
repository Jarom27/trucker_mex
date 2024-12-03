import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import { useState } from "react"

function App() {
  const [isClickedMenu, setIsClickedMenu] = useState("extend")
  function handleMenu(){
    if(isClickedMenu == "extend"){
      setIsClickedMenu("")
    }
    else{
      setIsClickedMenu("extend")
    }
  }
  return (
    <div className="view">
      <div className="sidebar">
        <div className="app-bar">
          <span className="material-symbols-outlined menu" onClick={handleMenu}>menu</span>
          <h1>Trucker Mex</h1>
        </div>
        <Navbar isClickedMenu={isClickedMenu} handleMenu={handleMenu}></Navbar>
        
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default App
