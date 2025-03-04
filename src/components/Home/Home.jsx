import './Home.css'
import AddPostBtn from '../AddPostBtn/AddPostBtn'
import Posts from '../Posts/Posts'


function Home() {
    const token = localStorage.getItem("token")
    return (
        <div className="home">
            {token ? <AddPostBtn /> : null}
            <Posts />
        </div>
    )
}

export default Home


