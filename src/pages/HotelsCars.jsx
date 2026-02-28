import React, { useState, useEffect } from "react";

// 📍 Monasteries with coordinates
const MONASTERIES = [
  { id: 1, name: "Rumtek Monastery", lat: 27.333, lon: 88.62 },
  { id: 2, name: "Pemayangtse Monastery", lat: 27.3732, lon: 88.2335 },
  { id: 3, name: "Enchey Monastery", lat: 27.3405, lon: 88.6138 },
  { id: 4, name: "Tashiding Monastery", lat: 27.2819, lon: 88.2648 },
  { id: 5, name: "Phodong Monastery", lat: 27.4308, lon: 88.5907 },
];

const HOTEL_API_KEY = "5ae2e3f221c38a28845f05b617d928b561cc25387a9a999caeac1ae0";

// Amadeus credentials
const AMADEUS_CLIENT_ID = "B94Nel3X8omMWxs8oGvlkmHHdJL4ld9s";
const AMADEUS_CLIENT_SECRET = "mrTiAhbzfog8MXD9";

function HotelsCars() {
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonastery, setSelectedMonastery] = useState(MONASTERIES[0]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("hotels");
  const [amadeusToken, setAmadeusToken] = useState(null);

  // Haversine Formula
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
  };

  // Fetch Hotels
  useEffect(() => {
    if (tab !== "hotels") return;
    async function fetchHotels() {
      setLoading(true);
      try {
        const { lat, lon } = selectedMonastery;
        const response = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=30000&lon=${lon}&lat=${lat}&kinds=accomodations&format=geojson&apikey=${HOTEL_API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch hotels");
        const data = await response.json();
        const withDistance = data.features.map((hotel) => {
          const [lon2, lat2] = hotel.geometry.coordinates;
          return {
            ...hotel,
            monasteryDistance: haversineDistance(lat, lon, lat2, lon2),
          };
        });
        setHotels(withDistance);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, [selectedMonastery, tab]);

  // Fetch Amadeus token
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "client_credentials",
              client_id: AMADEUS_CLIENT_ID,
              client_secret: AMADEUS_CLIENT_SECRET,
            }),
          }
        );
        if (!response.ok) throw new Error("Failed to get Amadeus token");
        const data = await response.json();
        setAmadeusToken(data.access_token);
      } catch (err) {
        console.error("Error fetching Amadeus token:", err);
      }
    }
    fetchToken();
  }, []);

  // Fetch Cars
  useEffect(() => {
    if (tab !== "cars") return;
    if (!amadeusToken) return;
    async function fetchCars() {
      setLoading(true);
      try {
        const { lat, lon } = selectedMonastery;
        const response = await fetch(
          `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=20`,
          { headers: { Authorization: `Bearer ${amadeusToken}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();
        setCars(data.data || []);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [selectedMonastery, tab, amadeusToken]);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.properties.name?.toLowerCase().includes(search.toLowerCase())
  );

  const bgImage = "/bg.jpg"; // Your background image path

  return (
    <div className="container">
      <style>{`
        .container {
          padding: 40px 30px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 85vh;
          background: linear-gradient(
              rgba(255, 255, 255, 0.85), 
              rgba(255, 255, 255, 0.85)
            ), url(${bgImage}) no-repeat center center;
          background-size: cover;
          border-radius: 15px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
          max-width: 1100px;
          margin: 30px auto;
          color: #2c3e50;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
          font-weight: 900;
          font-size: 2.8rem;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.1);
          color: #34495e;
        }
        .tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
          gap: 20px;
        }
        .tab {
          padding: 12px 28px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.1rem;
          background: #e1eaff;
          color: #34495e;
          box-shadow: 0 4px 8px rgba(52, 73, 94, 0.1);
          transition: all 0.3s ease;
          user-select: none;
        }
        .tab:hover {
          background: #b7c7ff;
          color: #1c2b62;
        }
        .tab.active {
          background: #34495e;
          color: white;
          box-shadow: 0 6px 15px rgba(52, 73, 94, 0.4);
        }
        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          margin-bottom: 30px;
        }
        select, input {
          padding: 14px 16px;
          border-radius: 10px;
          border: 2px solid #34495e;
          font-size: 1rem;
          font-weight: 600;
          width: 250px;
          transition: border-color 0.3s ease;
        }
        select:hover, input:hover,
        select:focus, input:focus {
          border-color: #007bff;
          outline: none;
        }
        input::placeholder {
          color: #a0a7b7;
          font-weight: 500;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgba(52, 73, 94, 0.12);
          padding: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 170px;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 30px rgba(52, 73, 94, 0.25);
        }
        .title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #2c3e50;
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .distance {
          font-size: 1rem;
          color: #5a6b81;
          margin-bottom: 18px;
        }
        .link {
          text-decoration: none;
          color: white;
          background: #007bff;
          padding: 12px 18px;
          border-radius: 12px;
          font-weight: 700;
          text-align: center;
          display: inline-block;
          transition: background 0.3s ease;
          user-select: none;
        }
        .link:hover {
          background: #0056b3;
        }
        p {
          font-size: 1.2rem;
          font-weight: 600;
          color: #34495e;
          margin-top: 40px;
          text-align: center;
          user-select: none;
        }

        @media (max-width: 600px) {
          .controls {
            flex-direction: column;
            align-items: center;
          }
          select, input {
            width: 100%;
            max-width: 350px;
          }
        }
      `}</style>

      <h1>Explore Nearby Hotels & Car Rentals</h1>

      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${tab === "hotels" ? "active" : ""}`}
          onClick={() => setTab("hotels")}
        >
          Hotels
        </div>
        <div
          className={`tab ${tab === "cars" ? "active" : ""}`}
          onClick={() => setTab("cars")}
        >
          Car Rentals
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <select
          value={selectedMonastery.id}
          onChange={(e) =>
            setSelectedMonastery(
              MONASTERIES.find((m) => m.id === Number(e.target.value))
            )
          }
        >
          {MONASTERIES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        {tab === "hotels" && (
          <input
            type="text"
            placeholder="🔍 Search hotels by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>

      {/* Hotels */}
      {tab === "hotels" && (
        <>
          {loading ? (
            <p>Loading hotels...</p>
          ) : filteredHotels.length === 0 ? (
            <p>❌ No hotels found.</p>
          ) : (
            <div className="grid">
              {filteredHotels.map((hotel) => (
                <div key={hotel.id} className="card">
                  <div className="title">
                    {hotel.properties.name || "Unnamed Hotel"}
                  </div>
                  <div className="distance">
                    📍 Distance from {selectedMonastery.name}:{" "}
                    {hotel.monasteryDistance} km
                  </div>
                  <a
                    className="link"
                    href={`https://www.google.com/maps?q=${hotel.geometry.coordinates[1]},${hotel.geometry.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Cars */}
      {tab === "cars" && (
        <>
          {loading ? (
            <p>Loading cars...</p>
          ) : cars.length === 0 ? (
            <p>❌ No car rentals found.</p>
          ) : (
            <div className="grid">
              {cars.map((car, i) => {
                const lat = car.geoCode?.latitude || selectedMonastery.lat;
                const lon = car.geoCode?.longitude || selectedMonastery.lon;
                return (
                  <div key={i} className="card">
                    <div className="title">{car.name || "Rental Car Service"}</div>
                    <div className="distance">🚗 Near {selectedMonastery.name}</div>
                    <a
                      className="link"
                      href={`https://www.google.com/maps?q=${lat},${lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HotelsCars;
