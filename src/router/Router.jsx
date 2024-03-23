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
import Register from "@/views/Register/Register.jsx";
import ForgotPsw from "@/views/ForgotPsw/ForgotPsw.jsx";
import ResetPsw from "@/views/ResetPsw/ResetPsw.jsx";
import BookAppointment from "@/views/UserHome/BookAppointment/BookAppointment.jsx";
import MyAppointment from "@/views/UserHome/MyAppointment/MyAppointment.jsx";
import MedicalHistory from "@/views/UserHome/MedicalHistory/MedicalHistory.jsx";
import PrescriptionHistory from "@/views/UserHome/PrescriptionHistory/PrescriptionHistory.jsx";
import BookTest from "@/views/UserHome/BookTest/BookTest.jsx";
import TestReport from "@/views/UserHome/TestReport/TestReport.jsx";

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
                path: "/user",
                // element: <RouteGuard><UserHome/></RouteGuard>
                element: <UserHome/>,
                children:[
                    {
                        path: "book-appointment",
                        element: <BookAppointment/>
                    },
                    {
                        path: "prescription-history",
                        element: <PrescriptionHistory/>
                    },
                    {
                        path: "book-test",
                        element: <BookTest/>
                    },
                    {
                        path: "my-appointment",
                        element: <MyAppointment/>
                    },
                    {
                        path: "my-appointment/:id",
                        element: <MyAppointment/>
                    },
                    {
                        path: "medical-history",
                        element: <MedicalHistory/>
                    },
                    {
                        path: "medical-history/:id",
                        element: <MedicalHistory/>
                    },
                    {
                        path: "test-report",
                        element: <TestReport/>
                    },
                    {
                        path: "test-report/:id",
                        element: <TestReport/>
                    },
                ]
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
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
