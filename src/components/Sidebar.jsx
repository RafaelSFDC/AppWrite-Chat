import React from "react";
import { BsChatSquareFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineChatBubble } from "react-icons/md";
import { useNavigate, } from 'react-router-dom';


const Sidebar = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <div>
                <BsChatSquareFill />
            </div>
            <ul>
                <li className={window.location.pathname == "/chat" ? "active" : ""} onClick={() => navigate('/chat')}><MdOutlineChatBubble /></li>
                <li className={window.location.pathname == "/users" ? "active" : ""} onClick={() => navigate('/users')}><FaUsers /></li>
                <li className={window.location.pathname == "/settings" ? "active" : ""} onClick={() => navigate('/settings')}><IoMdSettings /></li>
            </ul>
        </nav>
    )
};

export default Sidebar;
