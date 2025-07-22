import React, { useState } from "react";
import "./counter.css";
import { useNavigate } from "react-router-dom";
import counterBackground from "../../assets/counter.png"; // Import the background image

function Counter() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="counter-app-container">
      <div className="counter-card">
        <h1>Counter App</h1>
        <div className="count-display">{count}</div>
        <div className="btn-group">
          <button
            onClick={() => setCount(count - 1)}
            disabled={count <= 0}
            className="decrement-btn"
          >
            Decrement
          </button>
          <button onClick={() => setCount(count + 1)} className="increment-btn">
            Increment
          </button>
        </div>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Counter;
