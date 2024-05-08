/**
 * author: Tsong
 * time: 16/03/2024 16:32
 */
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App.jsx";
import Home from "@/views/Home/Home.jsx";
import Login from "@/views/Login/Login.jsx";
import RouteGuard from "@/router/RouteGuard.jsx";
import DoctorHome from "@/views/DoctorHome/DoctorHome.jsx";
import Timetable from "@/views/DoctorHome/Timetable/Timetable.jsx";
import Pending from "@/views/DoctorHome/Pending/Pending.jsx";
import Ongoing from "@/views/DoctorHome/Ongoing/Ongoing.jsx";
import Completed from "@/views/DoctorHome/Completed/Completed.jsx";
import PendingDetail from "@/views/DoctorHome/Pending/PendingDetail/PendingDetail.jsx";
import OngoingDetail from "@/views/DoctorHome/Ongoing/OngoingDetail/OngoingDetail.jsx";
import CompletedDetail from "@/views/DoctorHome/Completed/CompletedDetail/CompletedDetail.jsx";
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
import UserInfo from "@/views/UserHome/UserInfo/UserInfo.jsx";
import PrescriptionDetail from "@/views/UserHome/PrescriptionDetail/PrescriptionDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/patient",
        // element: <RouteGuard><UserHome/></RouteGuard>
        element: <UserHome />,
        children: [
          {
            path: "info",
            element: <UserInfo />,
          },
          {
            path: "book-appointment",
            element: <BookAppointment />,
          },
          {
            path: "prescription-history",
            element: <PrescriptionHistory />,
          },
          {
            path: "prescription-history/:id",
            element: <PrescriptionDetail />,
          },
          {
            path: "book-test",
            element: <BookTest />,
          },
          {
            path: "my-appointment",
            element: <MyAppointment />,
          },
          {
            path: "my-appointment/:id",
            element: <MyAppointment />,
          },
          {
            path: "medical-history",
            element: <MedicalHistory />,
          },
          {
            path: "medical-history/:id",
            element: <MedicalHistory />,
          },
          {
            path: "test-report",
            element: <TestReport />,
          },
          {
            path: "test-report/:id",
            element: <TestReport />,
          },
        ],
      },
      {
        path: "/doctor",
        element: <DoctorHome />,
        children: [
          {
            path: "timetable",
            element: <Timetable />,
          },
          {
            path: "pending",
            element: <Pending />,
          },
          {
            path: "ongoing",
            element: <Ongoing />,
          },
          {
            path: "completed",
            element: <Completed />,
          },
          {
            path: "pending/:id",
            element:<Pending />
          },
          {
            path: "ongoing/:id",
            element:<Ongoing />
          },
          {
            path: "completed/:id",
            element:<Completed />
          }
        ]
      },
    ],
  },
  {
    path: "/login/:role",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot/:role",
    element: <ForgotPsw />,
  },
  {
    path: "/reset/:role",
    element: <ResetPsw />,
  },
]);

export default router;
