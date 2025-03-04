import api from "../../../baseAPI";
import "./Posts.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "../Post/Post";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!hasMore) return;
            try {
                const response = await axios.get(`${api}/posts?limit=10&page=${page}`);
                const newPosts = response.data.data;

                if (newPosts.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if (nearBottom && !loading && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    if (loading) return <div className="loader-container"><p className="loader"></p></div>;

    return (
        <div className="posts">
            {posts.length > 0 && (
                posts.map((post) => (
                    <Link to={`/post/${post.id}`} key={`${post.id}-${Math.random()}`}>
                        <Post post={post} />
                    </Link>
                ))
            ) }
        </div>
    );
}

export default Posts;
