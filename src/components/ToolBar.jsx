import React from "react";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function ToolBar({openSideBar,sideBarState,toolBarData}) {
    const [toolBar, settoolBars] = useState(toolBarData);
    const navigate = useNavigate();

    const handleLinkClick = (link, title) => {
        if (title === "Log out" || link === "logout") {
            // Clear localStorage and navigate to login
            localStorage.removeItem('userType');
            navigate("/");
        }
    };

    return (
        <div>
            <div className="menu_icon">
            <button className="menu" onClick={openSideBar}><MenuIcon/></button>
            <button className="menu" ><Link to="/notifications" className="toolLink"><NotificationsIcon/></Link></button>
            </div>
            <div className={sideBarState?"toolBar toolBar--open":"toolBar"}>   
                <ul>    
                {toolBar.map((val,key)=>{
                 if (val.title === "Log out" || val.link === "logout") {
                    return <li key={key} className="toolRow">
                        <div onClick={() => handleLinkClick(val.link, val.title)} className="toolLink" style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                            <span className="icon">{val.icon}</span>
                            <span className="title">{val.title}</span>
                        </div>
                    </li>
                 }
                 return <li key={key} className="toolRow">
                    <Link to={val.link} className="toolLink">
                     <span className="icon">{val.icon}</span>
                     <span className="title">{val.title}</span>
                     </Link>
                  </li>
                 })}
                </ul>
             </div>
             <div className={sideBarState?"pageShadow pageShadow--open":"pageShadow"}></div>
             <div
        className={sideBarState ? "pageShadow pageShadow--open" : "pageShadow"}
        onClick={openSideBar}></div>
        </div>
    )

}