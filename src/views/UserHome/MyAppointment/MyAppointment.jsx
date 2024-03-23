/**
 * author: Tsong
 * time: 20/03/2024 19:23
 */
import "./MyAppointment.less"
import {useLocation, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import {Card} from "antd";
import {useEffect, useState} from "react";

const MyAppointment = () => {
    const location = useLocation();
    const params = useParams()

    // console.log(location)
    const {pathname, state} = location

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
                        id: 0,
                        type: "clinic",
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                    },
                    {
                        id: 1,
                        type: "clinic",
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                    },
                    {
                        id: 2,
                        type: "clinic",
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
            Detail={MyAppointmentDetail}
        />
    )
}

const MyAppointmentDetail = (props) => {
    const {params, state} = props
    const {title} = state
    const {id} = params
    const [aptData, setAptData] = useState(
        {
            time: "",
            ref: "",
            firstName: "",
            lastName: "",
            type: "",
            doctor: "",
            location: ""
        }
    )

    useEffect(() => {
        console.log("onMounted", id)
        // 用id去查数据
        setAptData({
            time: "23-03-2024 15:15",
            ref: "C3221982",
            firstName: "Yaocong",
            lastName: "Huang",
            type: "Clinic, face-to-face",
            doctor: "DR. FOO",
            location: "XXX Street, Southampton, SO17 1BJ"
        })
    }, []);
    return (
        <div className="detail-container">
            <Card
                className="detail-card"
                title={
                    <div className="detail-title">
                        <div className="detail-title-info">
                            <div className="detail-title-info-tag">Time:</div>
                            <div className="detail-title-info-val">{aptData.time}</div>
                        </div>
                        <div className="detail-title-name">{title}</div>
                        <div className="detail-title-info">
                            <div className="detail-title-info-tag">Ref:</div>
                            <div className="detail-title-info-val">{aptData.ref}</div>
                        </div>
                    </div>
                }
            >
                <div className="detail-content">
                    <div className="detail-item">
                        <div className="detail-item-title">Name:</div>
                        <div className="detail-item-content">{`${aptData.firstName} ${aptData.lastName}`}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-item-title">Type:</div>
                        <div className="detail-item-content">{aptData.type}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-item-title">Doctor:</div>
                        <div className="detail-item-content">{aptData.doctor}</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-item-title">Location:</div>
                        <div className="detail-item-content">{aptData.location}</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default MyAppointment
