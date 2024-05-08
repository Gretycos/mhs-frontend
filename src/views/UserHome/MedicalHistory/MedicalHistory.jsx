/**
 * author: Tsong
 * time: 20/03/2024 19:24
 */
import "./MedicalHistory.less"
import {useLocation, useNavigate, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import {useEffect, useState} from "react";
import {Card, Divider} from "antd";
import {getMyMedHistories, getMyMedHistory} from "@/service/med/medHistory.js";

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

    const getData = async (params) => {
        console.log("sending request:", params)
        const {data} = await getMyMedHistories(params)
        return data
        // return {
        //     code: 200,
        //     msg: "ok",
        //     data: {
        //         page: 1,
        //         totalSize: 100,
        //         data: [
        //             {
        //                 id: 0,
        //                 title: "Meeting with DR.Foo",
        //                 time: "22-03-2024 15:00",
        //             },
        //             {
        //                 id: 1,
        //                 title: "Meeting with DR.Foo",
        //                 time: "22-03-2024 15:00",
        //             },
        //             {
        //                 id: 2,
        //                 title: "Meeting with DR.Foo",
        //                 time: "22-03-2024 15:00",
        //             },
        //         ],
        //     }
        // }
    }

    return (
        <UserFramework
            state={state}
            pathname={pathname}
            params={params}
            selectors={selectors}
            getData={getData}
            Detail={MedHisDetail}
        />
    )
}

const MedHisDetail = (props) => {
    const {params} = props
    const {id} = params
    const [medHisData, setMedHisData] = useState(
        {
            time: "",
            ref: "",
            firstName: "",
            lastName: "",
            age: -1,
            gender: "",
            doctor: "",
            selfDisc: "",
            diagnosis: "",
        }
    )

    useEffect(() => {
        console.log("onMounted", id)
        // 用id去查数据
        getDetailData()
    }, []);

    const getDetailData = async () => {
        // 用id去查数据
        const params = {
            medHistoryId: id,
        }
        const {data} = await getMyMedHistory(params)
        console.log(data)
        setMedHisData({
            time: data.medTime,
            ref: data.medHistoryId,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            gender: data.gender === 0? "Male" : "Female",
            doctor: data.doctor,
            selfDisc: data.selfDisc === null ? "" : data.selfDisc,
            diagnosis: data.diagnosis === null ? "" : data.diagnosis,
        })
        // setMedHisData({
        //     time: "23-03-2024 15:15",
        //     ref: "TBT221982",
        //     firstName: "Yaocong",
        //     lastName: "Huang",
        //     age: 22,
        //     gender: "Male",
        //     doctor: "DR. FOO",
        //     selfDisc: "patient self description",
        //     diagnosis: "This is diagnosis content",
        // })
    }

    return (
        <div className="medhis-container">
            <Card
                className="medhis-card"
                title={
                    <div className="medhis-title">
                        <div className="medhis-title-row medhis-title-row-1">
                            <div className="medhis-title-name">Medical Record</div>
                        </div>
                        <div className="medhis-title-row medhis-title-row-2">
                            <div className="medhis-title-info">
                                <div className="medhis-title-info-tag">Time:</div>
                                <div className="medhis-title-info-val">{medHisData.time}</div>
                            </div>
                            <div className="medhis-title-info">
                                <div className="medhis-title-info-tag">Ref:</div>
                                <div className="medhis-title-info-val">{medHisData.ref}</div>
                            </div>
                        </div>
                        <div className="medhis-title-row medhis-title-row-3">
                            <div className="medhis-title-info">
                                <div className="medhis-title-info-tag">Name:</div>
                                <div className="medhis-title-info-val">{`${medHisData.firstName} ${medHisData.lastName}`}</div>
                            </div>
                            <div className="medhis-title-info">
                                <div className="medhis-title-info-tag">Age:</div>
                                <div className="medhis-title-info-val">{medHisData.age}</div>
                            </div>
                            <div className="medhis-title-info">
                                <div className="medhis-title-info-tag">Gender:</div>
                                <div className="medhis-title-info-val">{medHisData.gender}</div>
                            </div>
                            <div className="medhis-title-info">
                                <div className="medhis-title-info-tag">Doctor:</div>
                                <div className="medhis-title-info-val">{medHisData.doctor}</div>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="medhis-content">
                    <div className="medhis-content-block">
                        <div className="medhis-content-block-title">
                            Patient Self-Description
                        </div>
                        <div className="medhis-content-block-text">
                            {medHisData.selfDisc}
                        </div>
                    </div>
                    <Divider/>
                    <div className="medhis-content-block">
                        <div className="medhis-content-block-title">
                            Diagnosis
                        </div>
                        <div className="medhis-content-block-text">
                            {medHisData.diagnosis}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default MedicalHistory
