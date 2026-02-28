function VRViewer({ vrImage }) {
  return (
    <>
      <style>{`
        .vr-viewer {
          margin: 2rem auto;
          width: 100%;
          max-width: 900px;
          height: 500px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 6px 12px rgba(0,0,0,0.15);
        }
        .vr-viewer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <div className="vr-viewer">
        <img src={vrImage || "/images/fallback-vr.jpg"} alt="VR View" />
      </div>
    </>
  );
}

export default VRViewer;
