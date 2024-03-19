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
import Timetable from "@/views/Timetable/Timetable.jsx";
import Pending from "@/views/Pending/Pending.jsx";
import Ongoing from "@/views/Ongoing/Ongoing.jsx";
import Completed from "@/views/Completed/Completed.jsx";

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
                path: "/doctor-home",
                element: <DoctorHome />
            },
            {
                path: "/doctor-timetable",
                element: <Timetable />
            },
            {
                path: "/doctor-pending",
                element: <Pending />
            },
            {
                path: "/doctor-ongoing",
                element: <Ongoing />
            },
            {
                path: "/doctor-completed",
                element: <Completed />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router
