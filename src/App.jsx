import Login from "./components/Login/Login"
import SideBar from "./components/SideBar/SideBar"
import { Route, Routes } from "react-router-dom"
import Home from './components/Home/Home'
import Register from "./components/Register/Register"
import AddPost from "./components/AddPost/AddPost"
import About from "./components/About/About"
import PostDetails from "./components/PostDetails/PostDetails"

function App() {

  return (
    <div className='app'>
      <SideBar />
      <div className="right-sec">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/add-post' element={<AddPost />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/post/:postId' element={<PostDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
