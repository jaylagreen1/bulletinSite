import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import  Home  from './pages/Home'
import  Login  from './pages/Login.js'
import  Signup  from './pages/Signup.js'
import  Layout from './Layout.js'
import  MyProfile from './pages/MyProfile.js'
import Settings from './pages/settings.js'
import Search from './pages/Search.js'


function App(){
  
  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
          <Route path="/" element={<Home/>}/> {/* default route when site is loaded */}
          <Route path="/Login" element={<Login/>}/> {/* http://localhost:3000/#/Login */}
          <Route path="/Signup" element={<Signup/>}/> {/* http://localhost:3000/#/Signup */}
          <Route path="/MyProfile" element={<MyProfile/>}/> {/* http://localhost:3000/#/MyProfile */}          
          <Route path="/Settings" element={<Settings/>}/> {/* http://localhost:3000/#/Settings */}          
          <Route path="/Search" element={<Search/>}/> {/* http://localhost:3000/#/Search */}          
        </Route>
      </Routes>
    </Router>
  )


}

export default App