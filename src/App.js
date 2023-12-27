
import React from 'react'

import Userlist from './components/Userlist/Userlist'
import UserDetails from './components/UserDetails/userDetails'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import { User } from './api'

const App = () => {
const router=createBrowserRouter([
  {path:"/", element:<Userlist/>},
  {path:"/details/:id", element:<UserDetails/>}])



  return (
 <>
  <RouterProvider router={router}/>
 </>
  )
}

export default App

