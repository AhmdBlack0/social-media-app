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
                <Link className="add-post-btn" to='/add-post'><FiPlus />Add Post</Link>
            }
        </div>
    )
}

export default NavBar
