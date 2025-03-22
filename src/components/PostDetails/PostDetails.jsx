import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseAPI from "../../../baseAPI";
import "./PostDetails.css";
import Post from "../Post/Post";
import AddComment from "../AddComment/AddComment";
import Comments from "../Comments/Comments";

function PostDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`${baseAPI}/posts/${postId}`)
            .then((response) => {
                setPost(response.data.data);
            })
            .catch((error) => {
                setError("Failed to fetch post details.");
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [postId]);

    if (loading) return <div className="loader-container"><p className="loader"></p></div>;
    if (error) return <p className="error">{error}</p>;
    if (!post) return <p>No post found.</p>;

    return (
        <div className="post-details">
            <Post post={post} />
            <Comments postId={postId} />    
            
            {
                token && <AddComment />
            }
        </div>
    );
}

export default PostDetails;
