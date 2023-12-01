import React from "react";
import { Link } from "react-router-dom";
import ListMotion from './framerMotion/ListMotion';

const Header = () => {
    return <header>
        <nav>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" />
                <p>ChatWrite</p>
            </div>

            <ul>
                <ListMotion>
                    <Link to="/">
                        Home
                    </Link>
                </ListMotion>
                <ListMotion>
                    <Link to="/chats">
                        Chats
                    </Link>
                </ListMotion>
                <ListMotion>
                    <Link to="/users">
                        Settings
                    </Link>
                </ListMotion>
                <ListMotion>
                    <button>Logout</button>
                </ListMotion>
            </ul>
        </nav>
    </header>
};

export default Header;
