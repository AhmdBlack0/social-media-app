import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseAPI from "../../../baseAPI";
import "./PostDetails.css";
import Post from "../Post/Post";
import AddComment from "../AddComment/AddComment";

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

            <div className="comments">
                <h3>Comments ({post.comments?.length || 0})</h3>

                {post.comments?.length > 0 ? (
                    post.comments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <div className="comment-header">
                                <img
                                    src={comment.author.profile_image}
                                    alt=""
                                    className="comment-avatar"
                                />
                                <div className="comment-user">
                                    <h4>{comment.author.username}</h4>
                                </div>
                            </div>
                            <p className="comment-body">{comment.body}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                )}
            </div>
            {
                token && <AddComment />
            }
        </div>
    );
}

export default PostDetails;
