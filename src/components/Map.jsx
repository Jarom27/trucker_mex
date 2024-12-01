import { useState,useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useParams } from "react-router"

const baseUrl = import.meta.env.VITE_API_BASE_URL
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map() {
    const [vehicleLocation,setVehicleLocation] = useState(null)
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState(null); 
    const params = useParams()
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch(`${baseUrl}/location/${params.id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                const result = await response.json();
                setVehicleLocation(result);
            }catch (err) {
                setError(err.message); // Maneja errores
              } finally {
                setLoading(false); // Termina la carga
              }
          };
      
          const interval = setInterval(() => {fetchData()},3000);
          console.log(vehicleLocation)
          return () => clearInterval(interval);
    },[])
     
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(vehicleLocation[0].latitude)
    return (
        <MapContainer center={[Number(vehicleLocation[0].latitude), Number(vehicleLocation[0].longitude)]} zoom={18} id="map">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[vehicleLocation[0].latitude, vehicleLocation[0].longitude]}>
                <Popup>Vehículo en movimiento</Popup>
            </Marker>
        </MapContainer>
    )
}