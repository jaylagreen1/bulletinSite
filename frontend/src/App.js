import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import  Home  from './pages/Home'
import  Login  from './pages/Login.js'
import  Signup  from './pages/Signup.js'
import  Layout from './Layout.js'


function App(){
  
  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
          <Route path="/" element={<Home/>}/> {/* default route when site is loaded */}
          <Route path="/Login" element={<Login/>}/> {/* http://localhost:3000/#/Login */}
          <Route path="/Signup" element={<Signup/>}/> {/* http://localhost:3000/#/Signup */}
        </Route>
      </Routes>
    </Router>
  )


}

export default App