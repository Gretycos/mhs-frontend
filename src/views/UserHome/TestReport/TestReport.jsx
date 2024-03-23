/**
 * author: Tsong
 * time: 20/03/2024 19:25
 */
import "./TestReport.less"
import {useLocation, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";
import {useEffect, useState} from "react";
import {Card} from "antd";

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
            Detail={TestReportDetail}
        />
    )
}

const TestReportDetail = (props) => {
    const {params} = props
    const {id} = params
    const [testData, setTestData] = useState(
        {
            time: "23-03-2024 15:15",
            ref: "TBT221982",
            type: "Tuberculosis Test",
            firstName: "Yaocong",
            lastName: "Huang",
            age: 22,
            gender: "Male",
            doctor: "DR. FOO",
            examiner: "DR. BAR"
        }
    )

    useEffect(() => {
        console.log("onMounted", id)
        // 用id去查数据
        setTestData({
            time: "23-03-2024 15:15",
            ref: "TBT221982",
            type: "Tuberculosis Test",
            firstName: "Yaocong",
            lastName: "Huang",
            age: 22,
            gender: "Male",
            doctor: "DR. FOO",
            examiner: "DR. BAR"
        })
    }, []);
    return (
        <div className="report-container">
            <Card
                className="report-card"
                title={
                    <div className="report-title">
                        <div className="report-title-row report-title-row-1">
                            <div className="report-title-name">{testData.type}</div>
                        </div>
                        <div className="report-title-row report-title-row-2">
                            <div className="report-title-info">
                                <div className="report-title-info-tag">Time:</div>
                                <div className="report-title-info-val">{testData.time}</div>
                            </div>
                            <div className="report-title-info">
                                <div className="report-title-info-tag">Ref:</div>
                                <div className="report-title-info-val">{testData.ref}</div>
                            </div>
                        </div>
                        <div className="report-title-row report-title-row-3">
                            <div className="report-title-info">
                                <div className="report-title-info-tag">Name:</div>
                                <div className="report-title-info-val">{`${testData.firstName} ${testData.lastName}`}</div>
                            </div>
                            <div className="report-title-info">
                                <div className="report-title-info-tag">Age:</div>
                                <div className="report-title-info-val">{testData.age}</div>
                            </div>
                            <div className="report-title-info">
                                <div className="report-title-info-tag">Gender:</div>
                                <div className="report-title-info-val">{testData.gender}</div>
                            </div>
                            <div className="report-title-info">
                                <div className="report-title-info-tag">Doctor:</div>
                                <div className="report-title-info-val">{testData.doctor}</div>
                            </div>
                            <div className="report-title-info">
                                <div className="report-title-info-tag">Examiner:</div>
                                <div className="report-title-info-val">{testData.examiner}</div>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="report-content">
                    这里是报告内容
                </div>
            </Card>
        </div>
    )
}

export default TestReport
