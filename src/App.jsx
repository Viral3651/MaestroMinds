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
import Setting from './Pages/Setting/Setting';
import Messages from './pages/messages/Messages';
import Login from './pages/login/login';
import Mystudents from './Pages/Mystudents/Mystudents';
import Tutors from './Tutor/Tutors/Tutors';
import Register from './pages/register/register';
import './App.css'
import Tutorregistration from './Tutor/Tutorregistration/Tutorregistration';
import Mytutor from './Pages/Mytutors/Mytutor';
import Logout from './Pages/Logout/Logout';
import About from './Pages/About/About';
import Tutorprofile from './Tutor/Tutorprofile/Tutorprofile';
import Studentprofile from './Student/Studentprofile/Studentprofile';
import SearchResults from './Pages/SearchResults/SearchResults';
import Tutorpage from './Tutor/Tutorpage/Tutorpage';



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
          path: "/tutor-profile",
          element: <Tutorprofile/>
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
          path: "/Tutors",
          element: <Tutors/>
        },
        {
          path: "/Register",
          element: <Register/>
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
        },
        {
          path: "/About",
          element: <About/>
        }
        ,
        {
          path: "/student-profile",
          element: <Studentprofile/>
        }
        ,
        {
          path: "/search",
          element: <SearchResults/>
        }
        ,
        {
          path: "/tutor/:id",
          element: <Tutorpage/>
        }
      ]
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App