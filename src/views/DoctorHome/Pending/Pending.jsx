/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Pending.less"
import { Select, Card, Pagination } from 'antd';
import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import DetailCard from "@/component/DetailCard/DetailCard.jsx";
import PendingDetail from "@/views/DoctorHome/Pending/PendingDetail/PendingDetail.jsx";
import {getMyAppointments} from "@/service/appointment/appointment.js";
import {getUncompletedAppointments} from "@/service/appointment/doctorAppointment.js";

const Pending = (props) => {
    const location = useLocation();
    const params = useParams()

    const {pathname, state} = location
    const practRole = state.practRole;

    const dateOptions = [
        {
            value: 0,
            label: "Next 7 Days",
        },
        {
            value: 1,
            label: "Next 2 weeks",
        },
        {
            value: 2,
            label: "Next 4 weeks",
        },
        {
            value: 3,
            label: "Next 8 weeks",
        },
    ]

    const selectors = [
        {
            title: "Date Range",
            key: "dateRange", // 当作后续发请求的参数变量名
            options: dateOptions,
        },
    ]

    const getData = async (params) => {
        console.log("sending request:", params)
        const {data} = await getUncompletedAppointments(params)

        return data
    }

    return (
        <UserFramework
            status={0}
            practRole={practRole}
            state={state}
            pathname={pathname}
            params={params}
            selectors={selectors}
            getData={getData}
            Detail={PendingDetail}
        />
    )
}


export default Pending
