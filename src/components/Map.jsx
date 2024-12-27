import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CarIcon from "../assets/car_icon.svg";
import L from "leaflet";
import { useParams } from "react-router";

const truckerServices = import.meta.env.VITE_API_TRUCKER_MAPS_SERVICE;

const vehicleIcon = new L.Icon({
  iconUrl: CarIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map() {
  const [vehicleLocation, setVehicleLocation] = useState({
    latitude: Number(localStorage.getItem("last_latitude")) || 0,
    longitude: Number(localStorage.getItem("last_longitude")) || 0,
    altitude: Number(localStorage.getItem("last_altitude")) || 0,
    timestamp: localStorage.getItem("last_timestamp") || "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wsRef = useRef(null); // Referencia para mantener la instancia del WebSocket
  const params = useParams();

  useEffect(() => {
    console.log("📡 Connecting to WebSocket server...");

    const connectWebSocket = () => {
      wsRef.current = new WebSocket(`ws://${truckerServices}/ws`);

      wsRef.current.onopen = () => {
        console.log("✅ WebSocket connected");
        wsRef.current.send(JSON.stringify({ action: "subscribe", vehicleId: params.id }));
      };

      wsRef.current.onmessage = (event) => {
        console.log("📩 Received message:", event.data);
        try {
          const data = JSON.parse(event.data);

          // Extraer datos anidados según el `params.id`
          if (data[params.id]) {
            const { Latitude, Longitude, Altitude, Timestamp } = data[params.id];
            setVehicleLocation({
              latitude: Number(Latitude) || 0,
              longitude: Number(Longitude) || 0,
              altitude: Number(Altitude) || 0,
              timestamp: Timestamp || "",
            });

            // Guardar en localStorage
            localStorage.setItem("last_latitude", Latitude);
            localStorage.setItem("last_longitude", Longitude);
            localStorage.setItem("last_altitude", Altitude);
            localStorage.setItem("last_timestamp", Timestamp);
          }
        } catch (err) {
          console.error("❌ Error parsing message:", err);
        }
      };

      wsRef.current.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
        setError("WebSocket error occurred");
      };

      wsRef.current.onclose = (event) => {
        console.warn("🔌 WebSocket closed:", event.code, event.reason);
        if (event.code !== 1000) {
          console.warn("⚠️ Attempting reconnection in 2 seconds...");
          setTimeout(connectWebSocket, 2000); // Intentar reconexión después de 2 segundos
        }
      };
    };

    connectWebSocket();
    setLoading(false);

    return () => {
      console.log("🔄 Cleaning up WebSocket...");
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [params.id]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Validar que las coordenadas son válidas antes de renderizar el mapa
  const isValidCoordinates =
    vehicleLocation.latitude !== 0 &&
    vehicleLocation.longitude !== 0 &&
    !isNaN(vehicleLocation.latitude) &&
    !isNaN(vehicleLocation.longitude);

  if (!isValidCoordinates) return <p>Esperando datos de localización...</p>;

  return (
    <MapContainer
      center={[Number(vehicleLocation.latitude), Number(vehicleLocation.longitude)]}
      zoom={18}
      id="map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[Number(vehicleLocation.latitude), Number(vehicleLocation.longitude)]}
        icon={vehicleIcon}
      >
        <Popup>Vehículo en movimiento</Popup>
      </Marker>
    </MapContainer>
  );
}
