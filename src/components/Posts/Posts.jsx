import api from "../../../baseAPI";
import "./Posts.css";
import useFetch from "../Controllers/GetAll";

function Posts() {
    const { data: posts, loading, error } = useFetch(`${api}/posts?limit=10`);

    if (loading) return <div className="loader-container"><p className="loader"></p></div>;
    if (error) return <p className="error">Failed to load posts.</p>;

    return (
        <div className="posts">
            {posts.length > 0 ? (
                posts.map((post) => {
                    return (
                        <div className="post" key={post.id}>
                            <div className="post-header">
                                <img className="post-profile-image" src={post.author.profile_image} alt="" />
                                <h4 className="post-username">{post.author.username}</h4>
                            </div>
                            <div className="post-body">
                                {post.image && <img className="post-image" src={post.image} alt="" />}
                                <p className="post-time">{post.created_at}</p>
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-description">{post.body}</p>
                            </div>
                            <div className="post-comments">
                                <p>({post.comments_count}) comments</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="no-posts">No posts available</p>
            )}
        </div>
    );
}

export default Posts;
