import React from 'react'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Questions from './components/Questions'
import Sidebar from './components/Sidebar'
import { ExamProvider } from './context/examContext'
import {UserProvider} from './context/userContext'

function App() {
  return (
  <UserProvider>
    <ExamProvider>
    <div className='h-screen w-screen flex flex-row font-manrope'>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/round/:name/:id" element={<Questions/>}/>
        </Routes>
      </Router>
    </div>
    </ExamProvider>
  </UserProvider>    
  )
}

export default App