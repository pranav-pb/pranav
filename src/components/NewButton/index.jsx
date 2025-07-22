import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import "./NewButton.css";

function NewButton() {
  const navigate = useNavigate();
  const [selectedAdSense, setSelectedAdSense] = useState("Select AdSense");
  const [showDropdown, setShowDropdown] = useState(false);

  const adSenseOptions = ["Pranav", "Adhil", "Vipi", "Thulasi", "Shiva"];

  const option = {
    title: {
      text: "AdSense Statistic",
      left: "center",
      top: 20,
      textStyle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#2f2f3f",
      textStyle: { color: "#fff" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      axisLine: { lineStyle: { color: "#999" } },
      axisLabel: { color: "#ccc" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisLabel: { color: "#ccc" },
      splitLine: { lineStyle: { color: "#333" } },
    },
    series: [
      {
        name: "AdSense",
        type: "line",
        smooth: true,
        data: [
          10000, 20000, 15000, 30000, 25000, 40000, 38000, 45000, 46000, 49000,
          53000, 58000,
        ],
        lineStyle: {
          color: "#f9c74f",
          width: 3,
        },
        itemStyle: {
          color: "#fff",
          borderColor: "#f9c74f",
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#f9c74f66" },
              { offset: 1, color: "transparent" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">Hi, Yasmine</div>
        <ul className="menu">
          <li>Dashboard</li>
          <li>News</li>
          <li>Video</li>
          <li>Carousel</li>
          <li>Statistics</li>
          <li>AdSense</li>
          <li>Invoices</li>
          <li>Billing Info</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <h2>Dashboard</h2>
          <input className="search" placeholder="Search..." />
        </div>

        <div className="cards">
          <div className="card green">
            <p className="title">Total AdSense</p>
            <h3>$12,000.00</h3>
            <p className="small">+20% Today</p>
          </div>
          <div className="card blue">
            <p className="title">Total News</p>
            <h3>741,570</h3>
            <p className="small">+10% Today</p>
          </div>
          <div className="card purple">
            <p className="title">Total Video</p>
            <h3>172,510</h3>
            <p className="small">+5% Today</p>
          </div>
        </div>

        <div className="bottom-section">
          <div className="chart-container">
            <div className="chart-header">
              <h3>AdSense Statistic</h3>
              <div
                className="adsense-dropdown-container"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="adsense-selected">
                  {selectedAdSense}
                  <span className="dropdown-arrow">▼</span>
                </div>
                {showDropdown && (
                  <ul className="adsense-dropdown">
                    {adSenseOptions.map((option) => (
                      <li
                        key={option}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAdSense(option);
                          setShowDropdown(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="chart-box">
              <ReactECharts option={option} style={{ height: "300px" }} />
            </div>
            <div className="chart-footer">
              <span>20% Since last week</span>
              <span className="detail-link">Detail</span>
            </div>
          </div>
          <div className="activity-box">
            <h3>Recent Activity</h3>
            <ul>
              <li>Land of Property</li>
              <li>Plant of Future</li>
              <li>Metaverse Server</li>
              <li>5 Top Healthy Food</li>
            </ul>
          </div>
        </div>
      </div>

      <button onClick={() => navigate("/")} className="back-button">
        Back to Main Menu
      </button>
    </div>
  );
}

export default NewButton;
