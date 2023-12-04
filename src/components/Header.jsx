import { Link } from "react-router-dom";
import ListMotion from './framerMotion/ListMotion';
import { CgUserlane } from "react-icons/cg";

const Header = () => {
    return <header>
        <nav>
            <div>
                <CgUserlane />
                <p>ChatWrite</p>
            </div>

            <ul>
                <ListMotion>
                    <Link to="/">
                        Chats
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
