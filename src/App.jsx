import Login from "./components/Login/Login"
import SideBar from "./components/SideBar/SideBar"
import { Route, Routes } from "react-router-dom"
import Home from './components/Home/Home'
import Register from "./components/Register/Register"
import AddPost from "./components/AddPost/AddPost"

function App() {

  return (
    <div className='app'>
      <SideBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/add-post' element={<AddPost />}/>
      </Routes>
    </div>
  )
}

export default App
