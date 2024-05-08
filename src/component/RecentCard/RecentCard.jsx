/**
 * author: Tsong
 * time: 20/03/2024 19:53
 */
import "./RecentCard.less"
import {Card, List} from "antd";
import {useEffect, useState} from "react";
import {getMyRecentAppointments} from "@/service/appointment/appointment.js";
import {getMyRecentTestReports} from "@/service/med/testReport.js";

const RecentCard = (props) => {
    const {type} = props
    const [dataList, setDataList] = useState([])

    useEffect(() => {
        // 获取数据
        getRecentList()
        // const appointmentList = [
        //     {
        //         type: "clinic",
        //         title: "Meeting with DR.Foo",
        //         time: "22-03-2024 15:00",
        //     },
        //     {
        //         type: "test",
        //         title: "Blood Test",
        //         time: "22-03-2024 16:00",
        //     },
        // ]
        //
        // const reportList = [
        //     {
        //         title: "CT Report",
        //         time: "22-03-2024 17:00",
        //     },
        //     {
        //         title: "Blood Report",
        //         time: "22-03-2024 18:00",
        //     },
        // ]

    }, []);

    const getRecentList = async () => {
        if (type === 0) {
            const {data} = await getMyRecentAppointments()
            setDataList(data)
        }else{
            const {data} = await getMyRecentTestReports()
            setDataList(data)
            // setDataList([])
        }
    }

    return (
        <Card
            className="recent-card"
            title={type === 0 ? "Recent Appointment" : "Recent Report"}
            bordered={false}
        >
            {
                dataList.length === 0?
                    (
                        <Card.Meta
                            description={`No ${type===0? "appointments" : "reports"} in recent days.`}
                        />
                    )
                    :
                    (
                        <List
                            itemLayout="horizontal"
                            dataSource={dataList}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        key={index}
                                        className={`recent-card-item${item.type ? (item.type === "clinic" ? "-b" : "-o") : "-p"}`}
                                        title={item.title}
                                        description={item.time}
                                    />
                                </List.Item>
                            )}
                        />
                    )
            }
        </Card>
    )
}

export default RecentCard
