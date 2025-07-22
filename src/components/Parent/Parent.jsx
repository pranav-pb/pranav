// Parent.jsx
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./parent.css";
import backgroundVideo from "../../assets/background.mp4";

function Parent() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented
          video.muted = true;
          video.play();
        });
      }
    }
  }, []);

  return (
    <div className="parent-container">
      <video
        ref={videoRef}
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className="home-container">
        <h1 className="main-title">Main Menu</h1>
        <div className="button-group">
          <button onClick={() => navigate("/counter")}>Counter</button>
          <button onClick={() => navigate("/todo")}>Todo</button>
          <button onClick={() => navigate("/register")}>
            Registration Here
          </button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default Parent;
