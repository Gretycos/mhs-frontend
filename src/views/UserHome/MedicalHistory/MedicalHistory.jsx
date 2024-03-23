/**
 * author: Tsong
 * time: 20/03/2024 19:24
 */
import "./MedicalHistory.less"
import {useLocation, useNavigate, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";

const MedicalHistory = () => {
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
                        id: 0,
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                    },
                    {
                        id: 1,
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                    },
                    {
                        id: 2,
                        title: "Meeting with DR.Foo",
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

export default MedicalHistory
