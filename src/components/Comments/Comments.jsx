import { useEffect, useState } from 'react';
import axios from 'axios';
import baseAPI from '../../../baseAPI';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`${baseAPI}/posts/${postId}`)
            .then((response) => {
                setComments(response.data.data.comments || []);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setError("Failed to load comments.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [postId, refresh]); // Now updates when a new comment is added

    const addComment = () => {
        if (!newComment.trim()) return; // Prevent empty comments

        axios.post(`${baseAPI}/posts/${postId}/comments`, { body: newComment })
            .then(() => {
                setNewComment('');
                setRefresh((prev) => !prev); // Toggle refresh to trigger useEffect
            })
            .catch((error) => {
                console.error("Error adding comment:", error);
                setError("Failed to add comment.");
            });
    };

    return (
        <div className="comments">
            <h3>Comments ({comments.length})</h3>

            <div className="comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={addComment}>Add Comment</button>
            </div>

            {loading ? (
                <p>Loading comments...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : comments.length > 0 ? (
                comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <div className="comment-header">
                            <img
                                src={comment.author?.profile_image || '/default-avatar.png'}
                                alt="User avatar"
                                className="comment-avatar"
                            />
                            <div className="comment-user">
                                <h4>{comment.author?.username || "Anonymous"}</h4>
                            </div>
                        </div>
                        <p className="comment-body">{comment.body}</p>
                    </div>
                ))
            ) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
}

export default Comments;
