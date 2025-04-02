import { useEffect, useState } from 'react';
import axios from 'axios';
import baseAPI from '../../../baseAPI';
import { useParams } from 'react-router-dom';

function Comments() {
    const [comments, setComments] = useState([]);
    const postId = useParams().postId;

    useEffect(() => {

        axios.get(`${baseAPI}/posts/${postId}`)
            .then((response) => {
                setComments(response.data.data.comments || []);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            })
    }, [postId]); // Now updates when a new comment is added


    return (
        <div className="comments">
            <h3>Comments ({comments.length})</h3>

            {
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
                ))}
        </div>
    );
}

export default Comments;
