
import ToolBar from "../../components/ToolBar";
import { useState } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
import { getHomeRoute } from "../../utils/getHomeRoute";
import { getToolBarData } from "../../utils/getToolBarData";
import "./support.css"


export default function Admin_suuport() {
  const [sideBar, setSideBar] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const toggleSideBar = () => setSideBar(prev => !prev);

  const handleSend = (e) => {
    e.preventDefault();
    
    if (answer.trim() === "") {
      alert("Please provide an answer before sending.");
      return;
    }
    
    // Show success message
    setShowSuccessModal(true);
    
    // Navigate to home after 1.5 seconds
    setTimeout(() => {
      navigate(getHomeRoute());
    }, 1500);
  };

  return(
     <main className="wrap">
      <ToolBar 
        openSideBar={toggleSideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />
      <div className="content">
        <h4>Support Conversations</h4>
      </div>
      <section className="info_support">
        <h8>Subject:</h8>
        <div className="info_box_support">
          <h8><b>a Problem with adding courses</b></h8>
        </div>
        <h8>Message:</h8>
        <div className="info_box_support">
          <p>problem when trying to add courses to my account. Each time I attempt to do so, the course doesn't appear in my list
          Could you please help me resolve this issue?</p>
        </div>
      </section>
      <section className="info_support">
        <h8>Your Answer:</h8>
        <textarea 
          className="text_arrea" 
          placeholder="Provide as much details as possible" 
          rows="5" 
          cols="40"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <button className="Btn" onClick={handleSend}>
          Send
        </button>
      </section>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-modal-content">
              <p className="success-modal-message">Message sent successfully!</p>
            </div>
          </div>
        </div>
      )}
    </main>    
  );
}
