function AudioGuide({ audioSrc, language }) {
  return (
    <>
      <style>{`
        .audio-guide {
          margin-top: 1.5rem;
          text-align: center;
        }
        .audio-guide h3 {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
          color: #2c3e50;
        }
        audio {
          width: 80%;
          outline: none;
        }
      `}</style>

      <div className="audio-guide">
        <h3>Audio Guide ({language})</h3>
        <audio controls>
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
}

export default AudioGuide;
