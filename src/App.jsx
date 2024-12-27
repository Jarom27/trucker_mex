import { Outlet } from "react-router"
import Navbar from "./components/Navbar"
import { useState } from "react"
import truckerLogo from "./assets/trucker.svg"
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
          <img className="logo" src={truckerLogo} alt="Trucker logo"/>
        </div>
        <Navbar isClickedMenu={isClickedMenu} handleMenu={handleMenu}></Navbar>
        
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default App
