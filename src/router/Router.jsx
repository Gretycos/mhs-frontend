/**
 * author: Tsong
 * time: 16/03/2024 16:32
 */
import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "@/App.jsx";
import Home from "@/views/Home/Home.jsx";
import Login from "@/views/Login/Login.jsx";
import RouteGuard from "@/router/RouteGuard.jsx";
import UserHome from "@/views/UserHome/UserHome.jsx";
import DoctorHome from "@/views/DoctorHome/DoctorHome.jsx";
import Doctor from "@/views/Doctor/Doctor.jsx";
import Timetable from "@/views/Timetable/Timetable.jsx";
import Pending from "@/views/Pending/Pending.jsx";
import Ongoing from "@/views/Ongoing/Ongoing.jsx";
import Completed from "@/views/Completed/Completed.jsx";
import Register from "@/views/Register/Register.jsx";
import ForgotPsw from "@/views/ForgotPsw/ForgotPsw.jsx";
import ResetPsw from "@/views/ResetPsw/ResetPsw.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home"/>
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <Home/>
            },
            {
                path: "/user-home",
                // element: <RouteGuard><UserHome/></RouteGuard>
                element: <UserHome/>
            },
            {
                path: "/doctor/home",
                element: <DoctorHome />
            },


        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path:"/doctor",
        element: <Navigate to="/doctor/home"/>
    },
    {
        path:"/doctor",
        element:<Doctor />,
        children: [
            {
                path: "timetable",
                element: <Timetable />
            },
            {
                path: "pending",
                element: <Pending />
            },
            {
                path: "ongoing",
                element: <Ongoing />
            },
            {
                path: "completed",
                element: <Completed />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/forgot",
        element: <ForgotPsw />
    },
    {
        path: "/reset",
        element: <ResetPsw />
    },
])

export default router
