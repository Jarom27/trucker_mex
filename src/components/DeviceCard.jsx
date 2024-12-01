/* eslint-disable react/prop-types */
import { Link } from "react-router"

export default function DeviceCard({device}) {
  return (
    <Link to={`/devices/${device.Device_id}`}>
        <article className="device-card">
            <h3>{`${device.brand} ${device.model}`}</h3>
            <p><span>Id del dispositivo: </span>{`${device.Device_id}`}</p>
            <p><span>Telefono: </span>{`${device.phone_number}`}</p>
        </article>
    </Link>
    
  )
}
