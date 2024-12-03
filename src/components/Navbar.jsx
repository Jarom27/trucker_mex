/* eslint-disable react/prop-types */
import { NavLink } from "react-router"


export default function Navbar({isClickedMenu}) {
  
  return (
    <>
      
      <nav className={isClickedMenu}>
        <NavLink to={"/"} end>
            Home
        </NavLink>
        <NavLink to={"/devices"}>
            Devices
        </NavLink>
      </nav>
    </>
    
  )
}
