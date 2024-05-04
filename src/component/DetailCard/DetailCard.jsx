/**
 * author: Tsong
 * time: 20/03/2024 19:53
 */
import "./DetailCard.less"
import {Card, List, Statistic} from "antd";
import {useEffect, useState} from "react";
import CountUp from "react-countup";
import {useParams} from "react-router-dom";

const DetailCard = (props) => {
    const {params} = props
    const {id} = useParams()
    console.log(params)
    const [detailData, setDetailData] = useState(
        {
            time: "",
            ref: "",
            type: "",
            firstName: "",
            lastName: "",
            birthday: "",
            gender: "",
            doctor: "",
            reason: "",
            result: "",
            prescription:[]
        }
    )

    useEffect(() => {
        console.log("onMounted", id)
        // 用id去查数据
        setDetailData({
            time: "23-03-2024 15:15",
            ref: "TBT221982",
            type: "Tuberculosis Test",
            firstName: "Yaocong",
            lastName: "Huang",
            birthday: "02-01-1998",
            gender: "Male",
            doctor: "DR. FOO",
            reason: "reason1",
            result: "result1",
            prescription:[{
                bnfName: "medicine 1",
                price: 12.00,
                item: 1,
                perQuantity: 10,
                totalQuantity: 10,
                adqusage: 2,
            },
                {
                    bnfName: "medicine 2",
                    price: 12.00,
                    item: 1,
                    perQuantity: 10,
                    totalQuantity: 10,
                    adqusage: 2,
                },
                {
                    bnfName: "medicine 3",
                    price: 12.00,
                    item: 1,
                    perQuantity: 10,
                    totalQuantity: 10,
                    adqusage: 2,
                }]
        })
    }, []);
    return (
        <div className="detail-container">
            <Card
                className="detail-card"
                title={
                    <div className="detail-title">
                        <div className="detail-title-row detail-title-row-1">
                            <div className="detail-title-name">title</div>
                        </div>
                        <div className="detail-title-row detail-title-row-2">
                            <div className="detail-title-info">
                                <div className="detail-title-info-tag">Time:</div>
                                <div className="detail-title-info-val">{detailData.time}</div>
                            </div>
                            <div className="detail-title-info">
                                <div className="detail-title-info-tag">Ref:</div>
                                <div className="detail-title-info-val">{detailData.ref}</div>
                            </div>
                        </div>
                        <div className="detail-title-row report-title-row-3">
                            <div className="detail-title-info">
                                <div className="detail-title-info-tag">Name:</div>
                                <div className="detail-title-info-val">{`${detailData.firstName} ${detailData.lastName}`}</div>
                            </div>
                            <div className="detail-title-info">
                                <div className="detail-title-info-tag">Birthdate:</div>
                                <div className="detail-title-info-val">{detailData.birthday}</div>
                            </div>
                            <div className="detail-title-info">
                                <div className="detail-title-info-tag">Gender:</div>
                                <div className="detail-title-info-val">{detailData.gender}</div>
                            </div>
                            <div className="detail-title-info">
                                <div className="detail-title-info-tag">Doctor:</div>
                                <div className="detail-title-info-val">{detailData.doctor}</div>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="detail-content">
                    {detailData.result}
                </div>
            </Card>
        </div>
    )
}

export default DetailCard
