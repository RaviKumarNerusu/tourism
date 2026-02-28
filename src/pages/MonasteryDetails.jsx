import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "aframe"; // Import A-Frame

function MonasteryDetails() {
  const { id } = useParams();
  const [monastery, setMonastery] = useState(null);
  const [error, setError] = useState(null);
  const [audioEn, setAudioEn] = useState(null);
  const [audioHi, setAudioHi] = useState(null);
  const [isEnPlaying, setIsEnPlaying] = useState(false);
  const [isHiPlaying, setIsHiPlaying] = useState(false);
  const [showVR, setShowVR] = useState(false); 
  const [vrLoading, setVrLoading] = useState(false);
  const fallbackImage = "/images/fallback.jpg";

  useEffect(() => {
    fetch("/monasteries.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const found = data.find((m) => m.id === parseInt(id));
        if (found) setMonastery(found);
        else setError("Monastery not found.");
      })
      .catch((err) => {
        console.error("Error loading monastery details:", err.message);
        setError("Failed to load monastery details.");
      });
  }, [id]);

  useEffect(() => {
    return () => {
      if (audioEn) {
        audioEn.pause();
        audioEn.currentTime = 0;
      }
      if (audioHi) {
        audioHi.pause();
        audioHi.currentTime = 0;
      }
    };
  }, [audioEn, audioHi]);

  const handlePlayEn = () => {
    if (audioEn) audioEn.pause();
    if (audioHi) audioHi.pause();
    const newAudio = new Audio(monastery.audioUrls.en);
    newAudio.play().catch(err => console.error("English audio play failed:", err));
    setAudioEn(newAudio);
    setAudioHi(null);
    setIsEnPlaying(true);
    setIsHiPlaying(false);
    newAudio.onended = () => setIsEnPlaying(false);
  };

  const handleStopEn = () => {
    if (audioEn) {
      audioEn.pause();
      audioEn.currentTime = 0;
      setAudioEn(null);
      setIsEnPlaying(false);
    }
  };

  const handlePlayHi = () => {
    if (audioHi) audioHi.pause();
    if (audioEn) audioEn.pause();
    const newAudio = new Audio(monastery.audioUrls.hi);
    newAudio.play().catch(err => console.error("Hindi audio play failed:", err));
    setAudioHi(newAudio);
    setAudioEn(null);
    setIsHiPlaying(true);
    setIsEnPlaying(false);
    newAudio.onended = () => setIsHiPlaying(false);
  };

  const handleStopHi = () => {
    if (audioHi) {
      audioHi.pause();
      audioHi.currentTime = 0;
      setAudioHi(null);
      setIsHiPlaying(false);
    }
  };

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "#e74c3c", fontSize: "1.1rem" }}>
        <p>{error}</p>
        <Link to="/main" className="back-link">⬅ Back to Main</Link>
      </div>
    );

  if (!monastery)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.1rem", color: "#7f8c8d" }}>
        <p>Loading monastery details...</p>
      </div>
    );

  return (
    <>
      <style>{`
        .details-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2c3e50;
          line-height: 1.6;
        }
        .details-title {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 2rem;
          color: #16a085;
        }
        .details-image {
          width: 100%;
          max-height: 450px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          margin-bottom: 1rem;
        }
        .details-desc {
          text-align: justify;
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        .section-card {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        .section-card h4 {
          margin-bottom: 1rem;
          color: #e67e22;
          font-size: 1.2rem;
          text-align: center;
        }
        .audio-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .audio-buttons button {
          padding: 0.5rem 1rem;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .audio-buttons button.play {
          background: #3498db;
        }
        .audio-buttons button.play:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
        .audio-buttons button.stop {
          background: #e74c3c;
        }
        .audio-buttons button.stop:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          justify-items: center;
        }
        .gallery-grid img {
          width: 100%;
          max-width: 250px;
          height: 250px;
          object-fit: cover;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-grid img:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        .vr-section button {
          padding: 0.5rem 1rem;
          background: #3498db;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .vr-section button.active {
          background: #e74c3c;
        }
        .back-link {
          color: #2980b9;
          text-decoration: underline;
          font-size: 1rem;
        }
      `}</style>

      <div className="details-container">
        <h2 className="details-title">{monastery.name}</h2>
        <img className="details-image" src={monastery.image || fallbackImage} alt={monastery.name} onError={(e) => (e.target.src = fallbackImage)} />
        <p className="details-desc">{monastery.description}</p>

        {monastery.audioUrls && (
          <div className="section-card">
            <h4>🎧 Audio Guides</h4>
            <div className="audio-buttons">
              <button className="play" onClick={handlePlayEn} disabled={isEnPlaying}>Play English</button>
              <button className="stop" onClick={handleStopEn} disabled={!isEnPlaying}>Stop English</button>
              <button className="play" onClick={handlePlayHi} disabled={isHiPlaying}>Play Hindi</button>
              <button className="stop" onClick={handleStopHi} disabled={!isHiPlaying}>Stop Hindi</button>
            </div>
          </div>
        )}

        {(monastery.pic1 || monastery.pic2 || monastery.pic3) && (
          <div className="section-card">
            <h4>📸 Photo Gallery</h4>
            <div className="gallery-grid">
              {[monastery.pic1, monastery.pic2, monastery.pic3].map((pic, index) => (
                pic && <img key={index} src={pic || fallbackImage} alt={`${monastery.name} Pic ${index+1}`} />
              ))}
            </div>
          </div>
        )}

        {monastery.vrPanorama && (
          <div className="section-card vr-section">
            <h4>🌐 VR Panorama</h4>
            <button className={showVR ? "active" : ""} onClick={() => setShowVR(!showVR)}>
              {showVR ? "Exit VR" : "View VR"}
            </button>
            {showVR && (
              <a-scene
                style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1000 }}
                vr-mode-ui="enabled: true"
                antialias="true"
              >
                <a-sky src={monastery.vrPanorama} rotation="0 180 0"></a-sky>
                <a-entity light="type: ambient; intensity: 0.7"></a-entity>
                <a-entity light="type: directional; intensity: 0.9; position: 0 1 0"></a-entity>
              </a-scene>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/main" className="back-link">⬅ Back to Main</Link>
        </div>
      </div>
    </>
  );
}

export default MonasteryDetails;
