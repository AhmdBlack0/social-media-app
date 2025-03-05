import axios from "axios";
import { useParams } from "react-router-dom";
import baseAPI from "../../../baseAPI";
import { useState } from "react";

function AddComment() {
    const [comment, setComment] = useState("");
    const { postId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${baseAPI}/posts/${postId}/comments`, { body: comment }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setComment("");
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-comment">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default AddComment;
