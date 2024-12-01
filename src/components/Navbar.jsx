import { Link, NavLink } from "react-router"

export default function Navbar() {
  return (
    <nav>
        <NavLink to={"/"} end>
            Home
        </NavLink>
        <NavLink to={"/devices"}>
            Devices
        </NavLink>
    </nav>
  )
}
