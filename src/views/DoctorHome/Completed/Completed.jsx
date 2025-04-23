/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Completed.less"
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import CompletedDetail from "@/views/DoctorHome/Completed/CompletedDetail/CompletedDetail.jsx";
import {getCompletedAppointments, getUncompletedAppointments} from "@/service/appointment/doctorAppointment.js";
import {getTestCompletedAppointments, getTestUncompletedAppointments} from "@/service/appointment/testAppointment.js";

const Completed = () => {
    const location = useLocation();
    const params = useParams()

    const {pathname, state, practRole} = location

    const selectors = [
        {
            title: "Date Range",
            key: "dateRange", // 当作后续发请求的参数变量名
            options: null,
        },
    ]

    const getData = async (params) => {
        // console.log("sending request:", params)
        const {data} = practRole === 0?await getCompletedAppointments(params) :await getTestCompletedAppointments(params)

        return data
    }

    return (
        <UserFramework
            status={4}
            practRole={practRole}
            state={state}
            pathname={pathname}
            params={params}
            selectors={selectors}
            getData={getData}
            Detail={CompletedDetail}
        />
    )
}


export default Completed
