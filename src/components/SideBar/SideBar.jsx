import { Link } from "react-router-dom";
import "./SideBar.css";
import { FaAnglesLeft, FaAnglesRight, FaUser } from "react-icons/fa6";
import { CiLogin, CiLogout } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import Swal from "sweetalert2";

function SideBar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location.reload();
                Swal.fire("Logged out!", "You have been logged out.", "success");
            }
        });
    };

    return (
        <nav className={`side-bar ${showSidebar ? "expanded" : ""}`}>
            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="close-side-bar"
                aria-label="Toggle Sidebar"
            >
                {showSidebar ? <FaAnglesLeft /> : <FaAnglesRight />}
            </button>

            <Link to="/" className="sidebar-link">
                <TiHome />
                {showSidebar && "Home"}
            </Link>

            {token ? (
                <>
                    <Link to="/profile" className="sidebar-link">
                        <FaUser />
                        {showSidebar && "Profile"}
                    </Link>
                    <Link onClick={handleLogout} className="logout-button sidebar-link">
                        <CiLogout />
                        {showSidebar && "Logout"}
                    </Link>
                </>
            ) : (
                <Link to="/login" className="sidebar-link" onClick={() => setShowSidebar(false)}>
                    <CiLogin />
                    {showSidebar && "Login"}
                </Link>
            )}
            <Link to="/about" className="sidebar-link">
                <AiFillInfoCircle />
                {showSidebar && "About Site"}
            </Link>
        </nav>
    );
}

export default SideBar;
