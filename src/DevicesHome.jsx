import { useEffect, useState } from "react";
import DeviceCard from "./components/DeviceCard";
import { jwtDecode } from "jwt-decode";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function DevicesHome() {
    const [devices, setDevices] = useState(null);
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState(null); 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const token = localStorage.getItem('token');
                
                if (!token) {
                    throw new Error('Token no disponible. Inicia sesión nuevamente.');
                }
                const data = jwtDecode(token)
                const response = await fetch(`${baseUrl}/devices/${data.userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Enviar token en el encabezado
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los dispositivos');
                }
                
                const result = await response.json();
                console.log('📦 Datos recibidos:', result);
                setDevices(result);
            } catch (err) {
                console.error('❌ Error:', err.message);
                setError(err.message); // Maneja errores
            } finally {
                setLoading(false); // Termina la carga
            }
        };
      
        fetchData();
    }, []);
    
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className="content">
            <h2>Devices</h2>
            <ul className="devices">
                {devices?.map((item, index) => (
                    <li key={index}><DeviceCard device={item} /></li>
                ))}
            </ul>
        </div>
    );
}
