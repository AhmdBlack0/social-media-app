import './Post.css'
function Post({ post }) {
    return (
        <div className="post">
            <div className="post-header">
                <img className="post-profile-image" src={post.author.profile_image} alt="" />
                <h4 className="post-username">{post.author.username}</h4>
            </div>
            <div className="post-body">
                {post.image == {} && <img className="post-image" src={post.image} alt="" />}
                <p className="post-time">{post.created_at}</p>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-description">{post.body}</p>
            </div>
            <div className="post-comments">
                <p>({post.comments_count}) comments</p>
            </div>
        </div>
    )
}

export default Post
