import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import ButtonMotion from "../components/framerMotion/Button";
import Spinner from "../components/Spinner";
import { formatForm } from "../functions";
import { appWriteLogin } from "../api/appWrite/api";
import { Toaster } from 'sonner';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const submitHandler = async (e) => {
        const form = await formatForm(e)
        setLoading(true);
        await appWriteLogin(form.email, form.password, setLoading)
    }
    return <div className="login">
        <Toaster richColors position="top-right" />
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
                {/* eslint-disable-next-line react/no-unescaped-entities */}
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
