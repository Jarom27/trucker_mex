import { useEffect, useState } from "react"
import DeviceCard from "./components/DeviceCard";
const baseUrl = import.meta.env.VITE_API_BASE_URL

export default function DevicesHome() {
    const [devices,setDevices] = useState(null) 
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState(null); 


    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch(`${baseUrl}/devices`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                const result = await response.json();
                console.log(result)
                setDevices(result);
            }catch (err) {
                setError(err.message); // Maneja errores
              } finally {
                setLoading(false); // Termina la carga
              }
          };
      
          fetchData();
          console.log(devices)
    },[])
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="content">
            <h2>Devices</h2>
            <ul className="devices">
                {devices.map((item, index) => (
                    <li key={index}><DeviceCard device={item}></DeviceCard></li>
                ))}
            </ul>
        </div>
    )
}
