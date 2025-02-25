
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from '../../../baseAPI'
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${api}/login`, {
                username,
                password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/")
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit}>
                <label className="login-label" htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-page-input"
                    />

                <label className="login-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-page-input"
                />
                <p className="register-link">Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
