import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Nav from './Components/Nav'
import Home from './Components/Home'
import QuestionsPage from './Components/QuestionsPage'
import Adminquestion from './Components/Adminquestion'
import Adminsignin from './Components/Adminsignin'
import Adminusers from './Components/Adminusers'
import Admindashboard from './Components/Admindashboard'
import Practice from './Components/Practice'
import Leaderboard from './Components/Leaderboard'
import About from './Components/About'
import ScorePage from './Components/Scorepage'
import AdminScores from './Components/Adminscore'
import Myscore from './Components/Myscore'
import Userprofile from './Components/Userprofile'
import Logout from './Components/Logout'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}>  </Route>
        <Route path='/signin' element={<Signin />}> </Route>
        <Route path='/signup' element={<Signup />}>  </Route>
        <Route path="/practice" element={<Practice />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-scores" element={<Myscore />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path='/questions/:level' element={<QuestionsPage />}></Route>
        <Route path='/admin' element={<Adminsignin />}></Route>
        <Route path='/adminquestion' element={<Adminquestion />}></Route>
        <Route path='//admin/users' element={<Adminusers />}></Route>
        <Route path='/admindashboard' element={<Admindashboard />}></Route>
        <Route path='/scorepage' element={<ScorePage/>}></Route>
        <Route path='/adminscore' element={<AdminScores/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        

      </Routes>
    </>
  )
}

export default App
