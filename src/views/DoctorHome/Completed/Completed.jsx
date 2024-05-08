/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Completed.less"
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import CompletedDetail from "@/views/DoctorHome/Completed/CompletedDetail/CompletedDetail.jsx";

const Completed = () => {
    const location = useLocation();
    const params = useParams()

    const {pathname, state} = location

    const selectors = [
        {
            title: "Date Range",
            key: "dateRange", // 当作后续发请求的参数变量名
            options: null,
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
