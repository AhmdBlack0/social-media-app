import { useState } from "react";
import "./AddPost.css";
import axios from "axios";
import baseAPI from "../../../baseAPI";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const [postTitle, setPostTitle] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [postDescription, setPostDescription] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", postTitle);
        formData.append("image", postImage);
        formData.append("body", postDescription);

        try {
            await axios.post(`${baseAPI}/posts`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/");
        } catch (error) {
            console.error("Error uploading post:", error);
        } 
    };

    return (
        <div className="add-post">
            <form className="add-post-form" onSubmit={handleSubmit}>
                <label htmlFor="postImage">Post Image</label>
                <input
                    type="file"
                    id="postImage"
                    accept="image/*"
                    onChange={(e) => setPostImage(e.target.files[0])}
                />

                <label htmlFor="postTitle">Title</label>
                <input
                    required
                    type="text"
                    id="postTitle"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />

                <label htmlFor="postDescription">Description</label>
                <input
                    type="text"
                    id="postDescription"
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddPost;
