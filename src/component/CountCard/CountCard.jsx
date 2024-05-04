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
                        <div>
                            The number of pending appointment is(Please solve them as fast as possible):
                            <Statistic value={countPending} formatter={formatter} />
                        </div>

                    )
                    :
                    (
                        <div>
                            The number of ongoing Request in next 8 weeks is:
                            <Statistic value={countOngoing} formatter={formatter} />
                        </div>

                    )
            }
        </Card>
    )
}

export default CountCard
