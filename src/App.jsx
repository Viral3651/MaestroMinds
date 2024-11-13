import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Footer from './Component/Footer/Footer';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from './pages/home/home';
import Appointment from './pages/Appointments/Appointments';
import Dashboard from './Pages/Dashboard/Dashboard';
import Setting from './Pages/Setting/Setting';
import Messages from './pages/messages/Messages';
import Login from './pages/login/login';
import Mystudents from './Pages/Mystudents/Mystudents';
import Profile from './pages/Profile/Profile';
import Tutors from './pages/Tutors/Tutors';
import Register from './pages/register/register';
import Add from './pages/add/add';
import './App.css'
import Tutorregistration from './Pages/Tutorregistration/Tutorregistration';
import Mytutor from './Pages/Mytutors/Mytutor';
import Logout from './Pages/Logout/Logout';



const App = () => {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet/>
        <Footer/>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/Appointments",
          element: <Appointment/>
        },
        {
          path: "/Dashboard",
          element: <Dashboard/>
        },
        {
          path: "/Setting",
          element: <Setting/>
        },
        {
          path: "/Messages",
          element: <Messages/>
        },
        {
          path: "/Login",
          element: <Login/>
        },
        {
          path: "/Mystudents",
          element: <Mystudents/>
        },
        {
          path: "/Profile",
          element: <Profile/>
        },
        {
          path: "/Tutors",
          element: <Tutors/>
        },
        {
          path: "/Register",
          element: <Register/>
        },
        {
          path: "/Add",
          element: <Add/>
        },
        {
          path: "/Tutorregistration",
          element: <Tutorregistration/>
        },
        {
          path: "/Mytutors",
          element: <Mytutor/>
        },
        {
          path: "/Logout",
          element: <Logout/>
        }
      ]
    },
  ]);
  return (
   <>
    <RouterProvider router={router} /></>
  )
}

export default App