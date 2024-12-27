/* eslint-disable react/prop-types */
import { NavLink } from "react-router"


export default function Navbar({isClickedMenu}) {
  
  return (
    <>
      
      <nav className={isClickedMenu}>
        <NavLink to={"/dashboard"} end>
            Home
        </NavLink>
        <NavLink to={"/dashboard/devices"}>
            Devices
        </NavLink>
      </nav>
    </>
    
  )
}
