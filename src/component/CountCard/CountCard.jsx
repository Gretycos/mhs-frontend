/**
 * author: Tsong
 * time: 20/03/2024 19:53
 */
import "./CountCard.less"
import {Card, List, Statistic} from "antd";
import {useEffect, useState} from "react";
import CountUp from "react-countup";

const CountCard = (props) => {
    const {type} = props
    const [dataList, setDataList] = useState([])
    const countPending = 15
    const countOngoing = 50

    const formatter = (value) => <CountUp end={value} separator="," />;

    useEffect(() => {
        // 获取数据

    }, []);

    return (
        <Card
            className="Pending Request"
            title={type === 0 ? "Pending Appointment" : "Ongoing Appointment"}
            bordered={false}
        >
            {
                type === 0?
                    (
                        <Statistic title="Please solve pending appointment as fast as possible" value={countPending} formatter={formatter} />

                    )
                    :
                    (
                        <Statistic title="Ongoing Request in next 8 weeks" value={countOngoing} formatter={formatter} />
                    )
            }
        </Card>
    )
}

export default CountCard
