/**
 * author: Tsong
 * time: 20/03/2024 19:25
 */
import "./TestReport.less"
import {useLocation, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";

const TestReport = () => {
    const location = useLocation();
    const params = useParams()

    const {pathname, state} = location

    const dateOptions = [
        {
            value: 0,
            label: "This Month",
        },
        {
            value: 1,
            label: "3 Months",
        },
        {
            value: 2,
            label: "6 Months",
        },
        {
            value: 3,
            label: "This Year",
        },
        {
            value: 4,
            label: "2 Years",
        },
    ]

    const typeOptions = [
        {
            value: 0,
            label: "Blood Test",
        },
        {
            value: 1,
            label: "Radiographic",
        },
        {
            value: 2,
            label: "Electrocardiogram",
        },
        {
            value: 3,
            label: "Physical Exam",
        },
    ]


    const selectors = [
        {
            title: "Date Range",
            key: "dateRange", // 当作后续发请求的参数变量名
            options: dateOptions,
        },
        {
            title: "Type",
            key: "type", // 当作后续发请求的参数变量名
            options: typeOptions,
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
                        id: 0,
                        title: "Tuberculosis Test",
                        time: "22-03-2024 15:00",
                    },
                    {
                        id: 1,
                        title: "Tuberculosis Test",
                        time: "22-03-2024 15:00",
                    },
                    {
                        id: 2,
                        title: "Tuberculosis Test",
                        time: "22-03-2024 15:00",
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
        />
    )
}

export default TestReport
