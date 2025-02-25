import { useState } from 'react';
import './Register.css';
import axios from 'axios';
import api from '../../../baseAPI';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            if (profileImage) {
                formData.append("profileImage", profileImage);
            }

            await axios.post(`${api}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "An error occurred during registration");
        }
    };

    return (
        <div className='register'>
            <h2 className="register-title">Register</h2>
            {error && <p className="error-message">{error}</p>} 
            <form onSubmit={handleSubmit}>
                <label className="register-label" htmlFor="username">Username</label>
                <input
                    type="text"
                    required
                    className="register-page-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label className="register-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    required
                    className="register-page-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className="register-label" htmlFor="email">Email</label>
                <input
                    type="email"
                    required
                    className="register-page-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="register-label" htmlFor="name">Name</label>
                <input
                    type="text"
                    required
                    className="register-page-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="register-label" htmlFor="profileImage">Profile Image</label>
                <input
                    type="file"
                    className="register-page-input"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                />

                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
