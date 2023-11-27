import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import ButtonMotion from "../components/framerMotion/Button";
import Spinner from "../components/Spinner";
import { useNavigate } from 'react-router-dom'
import state from "../store";
import { formatForm } from "../functions";
import { appWriteLogin } from "../api/appWrite/api";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        const form = await formatForm(e)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        await appWriteLogin(form.email, form.password)
        // console.log(form.email, form.password)
    }
    return <div className="login">
        <div>
            <h1>Login</h1>
            <form action="" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="U0WJZ@example.com" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="********" required />
                </div>
                {loading ? <Spinner /> : <ButtonMotion type="submit">LOGIN</ButtonMotion>}
            </form>
            <div>
                <p>Don't have an account?</p>
                <Link to="/register">
                    SIGN UP
                </Link>
            </div>
            <div>
                <p> Or sign up using</p>
                <div>
                    <ButtonMotion>
                        <FcGoogle />
                    </ButtonMotion>
                    <ButtonMotion>
                        <FaFacebook />
                    </ButtonMotion>
                </div>
            </div>
        </div>
    </div>;
};

export default Login;
