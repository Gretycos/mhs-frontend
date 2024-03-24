/**
 * author: Tsong
 * time: 16/03/2024 16:32
 */
import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "@/App.jsx";
import Home from "@/views/Home/Home.jsx";
import RouteGuard from "@/router/RouteGuard.jsx";
import DoctorHome from "@/views/DoctorHome/DoctorHome.jsx";
import Doctor from "@/views/Doctor/Doctor.jsx";
import Timetable from "@/views/Timetable/Timetable.jsx";
import Pending from "@/views/Pending/Pending.jsx";
import Ongoing from "@/views/Ongoing/Ongoing.jsx";
import Completed from "@/views/Completed/Completed.jsx";
import PendingDetail from "@/views/PendingDetail/PendingDetail.jsx";
import OngoingDetail from "@/views/OngoingDetail/OngoingDetail.jsx";
import CompletedDetail from "@/views/CompletedDetail/CompletedDetail.jsx";

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
                path: "/doctor/home",
                element: <DoctorHome />
            },


        ]
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
            },
            {
                path: "pending/details/:id",
                element:<PendingDetail />
            },
            {
                path: "ongoing/details/:id",
                element:<OngoingDetail />
            },
            {
                path: "completed/details/:id",
                element:<CompletedDetail />
            }
        ]
    }
])

export default router
