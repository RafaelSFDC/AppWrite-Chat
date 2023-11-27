import React from "react";
import { BsChatSquareFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineChatBubble } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <nav>
            <div>
                <BsChatSquareFill />
            </div>
            <ul>
                <li onClick={() => navigate('/chat')}><MdOutlineChatBubble /></li>
                <li onClick={() => navigate('/users')}><FaUsers /></li>
                <li onClick={() => navigate('/settings')}><IoMdSettings /></li>
            </ul>
        </nav>
    )
};

export default Sidebar;
