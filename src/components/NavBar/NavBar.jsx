import { Link } from "react-router-dom"
import { FiPlus } from "react-icons/fi";
import './NavBar.css'


function NavBar() {
    const token = localStorage.getItem("token")
    return (
        <div className="nav">
            {/* <input type="search" /> */}
            {
                token &&
                <Link title="Add Post" className="add-post-btn" to='/add-post'><FiPlus /></Link>
            }
        </div>
    )
}

export default NavBar
