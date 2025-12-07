import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Analytics/AnalyticsPage.css";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import { getHomeRoute } from "../../utils/getHomeRoute";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";

const API_BASE_URL = "http://localhost:5000/api";

export default function AdminAnalytics() {
  const [sideBar, setSideBar] = useState(false);
  const [stats, setStats] = useState([
    { id: 1, label: "Total Sessions", value: 0, icon: <BarChartIcon /> },
    { id: 2, label: "Total Enrollments", value: 0, icon: <BarChartIcon /> },
    { id: 3, label: "Average Rating", value: 0, icon: <BarChartIcon /> },
    { id: 4, label: "Active Tutors", value: 0, icon: <BarChartIcon /> },
  ]);
  const [loading, setLoading] = useState(true);
  
  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/analytics`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await res.json();
        
        setStats([
          { id: 1, label: "Total Sessions", value: data.totalSessions || 0, icon: <BarChartIcon /> },
          { id: 2, label: "Total Enrollments", value: data.totalEnrollments || 0, icon: <BarChartIcon /> },
          { id: 3, label: "Average Rating", value: data.averageRating || 0, icon: <BarChartIcon /> },
          { id: 4, label: "Active Tutors", value: data.activeTutors || 0, icon: <BarChartIcon /> },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const subjects = [
    { id: 1, name: "MATH 101", height: "20%" },
    { id: 2, name: "PHYS 102", height: "25%" },
    { id: 3, name: "ICS 104", height: "60%" },
    { id: 4, name: "CHEM 101", height: "35%" },
  ];

  return (
    <div className="d-flex justify-content-center">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />
      <div className="analytics-shell">
        {/* Content */}
          <div className="d-flex justify-content-center mb-3">
            <BarChartIcon className="me-2 text-success" />
            <h2 className="m-0 analytics-title">Analytics</h2>
          </div>

          {/* Stat cards */}
          <div className="row g-3 mb-4">
            {stats.map((s) => (
              <div key={s.id} className="col-6">
                <div className="analytics-stat-card">
                  <div className="analytics-stat-icon">{s.icon}</div>
                  <div className="analytics-stat-label">{s.label}</div>
                  <div className="analytics-stat-value">{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sessions by Subject */}
          <div className="analytics-section">
            <h3 className="analytics-section-title mb-3">Sessions by Subject</h3>
            <div className="d-flex justify-content-between">
              {subjects.map((subject) => (
                <div key={subject.id} className="analytics-subject-card">
                  <div className="analytics-subject-bar-wrapper">
                    <div
                      className="analytics-subject-bar"
                      style={{ height: subject.height }}
                    />
                  </div>
                  <div className="analytics-subject-name">{subject.name}</div>
                </div>
              ))}
            </div>
          </div>

        {/* Bottom home button */}
        <div className="unified-home-bottom-nav">
          <button className="unified-home-btn">
            <Link to={getHomeRoute()}>
              <HomeIcon />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

