/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Ongoing.less"
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card, Pagination, Select} from "antd";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import OngoingDetail from "@/views/DoctorHome/Ongoing/OngoingDetail/OngoingDetail.jsx";
import {getTestUncompletedAppointments} from "@/service/appointment/testAppointment.js";
import {getUncompletedAppointments} from "@/service/appointment/doctorAppointment.js";
const Ongoing = () => {
    const location = useLocation();
    const params = useParams()

    const {pathname, state} = location
    const practRole = state.practRole;
    // console.log(state)
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
        // console.log("sending request:", params)
        const {data} = practRole === 0?await getUncompletedAppointments(params) :await getTestUncompletedAppointments(params)

        return data
    }

    return (
        <UserFramework
            status={1}
            practRole={practRole}
            state={state}
            pathname={pathname}
            params={params}
            selectors={selectors}
            getData={getData}
            Detail={OngoingDetail}
        />
    )

    /*return (
        <div className="ongoing-page-container">
            <div className="ongoing-head-container">
                <p className="ongoing-head-font">Ongoing Request</p>
                <div className="ongoing-head-line" />
            </div>
            <div className="ongoing-content-container">
                <Select defaultValue="This week" className="ongoing-select-tools" onChange={handleDataChange} options={opts}
                        size={"large"}/>
                <div className="ongoing-list-container">
                    {renderCards()}
                    <Pagination
                        className="ongoing-pagination-style"
                        current={currentPage}
                        pageSize={pageSize}
                        total={listdata.length}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )*/
}
export default Ongoing
