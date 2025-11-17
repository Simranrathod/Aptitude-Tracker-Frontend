import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Nav from './Components/Nav'
import Home from './Components/Home'
import QuestionsPage from './Components/QuestionsPage'
function App() {
  return (
   <>
<Nav/>
   <Routes>
     <Route path='/' element={<Home/>}>

    </Route>
    <Route path='/signin' element={<Signin/>}>

    </Route>
    <Route path='/signup' element={<Signup/>}>

    </Route>
    <Route path='/questions/:level' element={<QuestionsPage/>}></Route>
   </Routes>
   </>
  )
}

export default App
