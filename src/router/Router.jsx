/**
 * author: Tsong
 * time: 16/03/2024 16:32
 */
import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "@/App.jsx";
import Home from "@/views/Home/Home.jsx";
import Login from "@/views/Login/Login.jsx";

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
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router
