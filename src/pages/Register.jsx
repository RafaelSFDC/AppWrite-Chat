import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import ButtonMotion from "../components/framerMotion/Button";
import Spinner from "../components/Spinner";
import { formatForm } from "../functions";
import { appWriteCreateUser } from "../api/appWrite/api";
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        const form = await formatForm(e)
        setLoading(true);
        toast.promise(appWriteCreateUser(form, setLoading),
            {
                loading: "Creating account...",
                success: () => {
                    e.target.reset()
                    navigate('/login')
                    return "Account created successfully"
                },
                error: (error) => {
                    return `Account creation failed. ${error}`
                },
            })
    }
    return <div className="login">
        <Toaster richColors position="top-right" />
        <div>
            <h1>Register</h1>
            <form action="" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username..." required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="U0WJZ@example.com" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="********" required />
                </div>
                {loading ? <Spinner /> : <ButtonMotion type="submit">Sign Up</ButtonMotion>}
            </form>
            <div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>Already have an account?</p>
                <Link to="/login">
                    Sign In
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

export default Register;
