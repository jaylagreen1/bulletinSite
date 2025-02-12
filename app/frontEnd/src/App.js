import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import  Home  from './pages/Home'
import  Page1  from './pages/Page1'
import  Page3  from './pages/Page3'
import  Layout from './Layout.js'


function App(){
  
  return (
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
          <Route path="/" element={<Home/>}/> {/* default route when site is loaded */}
          <Route path="/Page1" element={<Page1/>}/> {/* http://localhost:3000/#/page1 */}
          <Route path="/Page3" element={<Page3/>}/> {/* http://localhost:3000/#/page3 */}
        </Route>
      </Routes>
    </Router>
  )


}

export default App