/**
 * author: Tsong
 * time: 20/03/2024 19:23
 */
import "./MyAppointment.less"
import {useLocation, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import {Card} from "antd";
import {useEffect, useState} from "react";
import {store} from "@/redux/store.js";
import {getMyAppointment, getMyDoctorAppointment} from "@/service/appointment/doctorAppointment.js";
import {getMyTestAppointment} from "@/service/appointment/testAppointment.js";

const MyAppointment = () => {
    const location = useLocation();
    const params = useParams()

    // console.log(location)
    const {pathname, state} = location

    const dateOptions = [
        {
            value: 0,
            label: "On Coming",
        },
        {
            value: 1,
            label: "7 Days",
        },
        {
            value: 2,
            label: "30 Days",
        },
        {
            value: 3,
            label: "90 Days",
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
                        status: 0,
                    },
                    {
                        id: 1,
                        type: "clinic",
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                        status: 1,
                    },
                    {
                        id: 2,
                        type: "clinic",
                        title: "Meeting with DR.Foo",
                        time: "22-03-2024 15:00",
                        status: 2,
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
    const {id} = params
    const [aptData, setAptData] = useState(
        {
            time: "",
            ref: "",
            firstName: "",
            lastName: "",
            type: "",
            doctor: "",
        }
    )

    const parseType = (first, second) => {
        let type = ""
        if (first === "clinic"){
            type += "CLINIC - "
            switch (second) {
                case 0: type += "FACE-TO-FACE"; break;
                case 1: type += "TELEPHONE"; break;
            }
        } else {
            type += "TEST - "
            switch (second) {
                case 0: type += "SURGERY"; break;
                case 1: type += "REGULAR"; break;
                case 2: type += "VACCINE"; break;
            }
        }
        return type
    }

    useEffect(async () => {
        console.log("onMounted", id, state.type)
        // 用id去查数据
        // const params = {
        //     appointId: id,
        //     patientId: store.getState()?.globalSlice.userId,
        // }
        // console.log(params)
        // const {data} = state.type === "clinic" ?
        //     await getMyDoctorAppointment(params) : await getMyTestAppointment(params)
        // console.log(data)
        // setAptData({
        //     time: data.time,
        //     ref: data.appointmentId,
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     type: parseType(state.type, data.type),
        //     doctor: data.doctor,
        // })
        setAptData({
            time: "23-03-2024 15:15",
            ref: "C3221982",
            firstName: "Yaocong",
            lastName: "Huang",
            type: "Clinic, face-to-face",
            doctor: "DR. FOO",
        })
    }, []);
    return (
        <div className="aptmt-container">
            <Card
                className="aptmt-card"
                title={
                    <div className="aptmt-title">
                        <div className="aptmt-title-row aptmt-title-row-1">
                            <div className="aptmt-title-name">Appointment Record</div>
                        </div>
                        <div className="aptmt-title-row aptmt-title-row-2">
                            <div className="aptmt-title-info">
                                <div className="aptmt-title-info-tag">Time:</div>
                                <div className="aptmt-title-info-val">{aptData.time}</div>
                            </div>
                            <div className="aptmt-title-info">
                                <div className="aptmt-title-info-tag">Ref:</div>
                                <div className="aptmt-title-info-val">{aptData.ref}</div>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="aptmt-content">
                    <div className="aptmt-item">
                        <div className="aptmt-item-title">Name:</div>
                        <div className="aptmt-item-content">{`${aptData.firstName} ${aptData.lastName}`}</div>
                    </div>
                    <div className="aptmt-item">
                        <div className="aptmt-item-title">Type:</div>
                        <div className="aptmt-item-content">{aptData.type}</div>
                    </div>
                    <div className="aptmt-item">
                        <div className="aptmt-item-title">Doctor:</div>
                        <div className="aptmt-item-content">{aptData.doctor}</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default MyAppointment
