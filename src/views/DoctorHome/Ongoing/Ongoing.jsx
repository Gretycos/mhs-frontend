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
const Ongoing = () => {
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

    const getData = (params) => {
        console.log("sending request:", params)
        return {
            code: 200,
            msg: "ok",
            data: {
                page: 1,
                totalSize: 100,
                data: [
                    {
                        id: '00000000',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000001',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000002',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000003',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                ],
            }
        }
    }

    return (
        <UserFramework
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
