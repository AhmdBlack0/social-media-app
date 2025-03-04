import { Link } from "react-router-dom"
import { FiPlus } from "react-icons/fi";
import './AddPostBtn.css'


function AddPostBtn() {
    return (
        <div className="nav">
            <Link title="Add Post" className="add-post-btn" to='/add-post'><FiPlus /></Link>
        </div>
    )
}

export default AddPostBtn
