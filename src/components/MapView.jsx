import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported

function MapView() {
  const [monasteries, setMonasteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/monasteries.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Loaded monasteries:", data); // Debug: Log loaded data
        if (Array.isArray(data)) setMonasteries(data);
        else setError("Invalid data format: Expected an array.");
      })
      .catch((err) => {
        console.error("Failed to load monasteries:", err.message);
        setError("Failed to load monastery data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading map...</div>;
  if (error) return <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <div style={{ height: "90vh", width: "100%", margin: "0 auto" }}>
      <MapContainer center={[27.33, 88.5]} zoom={9} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {monasteries.map((m) => {
          // Validate coordinates
          const lat = parseFloat(m.lat);
          const lng = parseFloat(m.lng);
          if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            console.warn(`Invalid coordinates for ${m.name}: [${m.lat}, ${m.lng}]`);
            return null;
          }
          return (
            <Marker key={m.id} position={[lat, lng]}>
              <Popup>
                <div style={{ maxWidth: "200px" }}>
                  <b>{m.name}</b>
                  {m.image && (
                    <img
                      src={m.image}
                      alt={`${m.name} Thumbnail`}
                      style={{ width: "100%", height: "auto", marginTop: "0.5rem" }}
                      onError={(e) => (e.target.style.display = "none")} // Hide if image fails
                    />
                  )}
                  <br />
                  <button
                    onClick={() => navigate(`/monastery/${m.id}`)}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.3rem 0.7rem",
                      background: "#2c3e50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;