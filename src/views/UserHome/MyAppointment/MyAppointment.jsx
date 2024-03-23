/**
 * author: Tsong
 * time: 20/03/2024 19:23
 */
import "./MyAppointment.less"
import {ArrowBack} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import DataList from "@/component/DataList/DataList.jsx";

const MyAppointment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {state} = location

    const dateOptions = [
        {
            value: 0,
            label: "Today",
        },
        {
            value: 1,
            label: "This Week",
        },
        {
            value: 2,
            label: "This Month",
        },
        {
            value: 3,
            label: "3 Months",
        },
        {
            value: 4,
            label: "This Year",
        },
    ]

    const typeOptions = [
        {
            value: 0,
            label: "Clinic",
        },
        {
            value: 1,
            label: "Test",
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
            key: "appointmentType",
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
                        type: "clinic",
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                    },
                    {
                        type: "clinic",
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                    },
                    {
                        type: "clinic",
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                    },
                ],
            }
        }
    }

    return (
        <div className="my-appointment">
            <div className="my-appointment-title">{state.title}</div>
            <ArrowBack className="back-icon" onClick={() => navigate("/user")}/>
            <DataList selectors={selectors} getData={getData}/>
        </div>
    )
}

export default MyAppointment
