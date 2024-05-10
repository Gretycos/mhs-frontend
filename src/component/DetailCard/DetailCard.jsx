/**
 * author: Tsong
 * time: 20/03/2024 19:53
 */
import "./DetailCard.less"
import {Card, List, Statistic} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const DetailCard = (props) => {
    const {params, detailData, prescription, result, title, diagnosis} = props
    //console.log(detailData, prescription, result, role)
    const {id} = useParams()

    return (
        <div className="detail-container">
            <Card
                className="detail-card"
                title={
                    <div className="detail-title">
                        <div className="detail-title-row detail-title-row-1">
                            <div className="detail-title-name">{title}</div>
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
                        <div className="detail-title-row detail-title-row-3">
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
                    <div className="detail-content-info">
                        <div className="detail-content-info-tag">Description for appointment:</div>
                        <div className="detail-content-info-val">{detailData.reason}</div>
                    </div>
                </div>
                {
                    prescription ?
                        (
                            <div className="detail-content">
                                <div className="detail-content-info">
                                    <div className="detail-content-info-tag">Prescription:</div>
                                    <div className="prescription-list-row">
                                        <div className="presecription-list-tag">Name</div>
                                        <div className="presecription-list-tag">Price</div>
                                        <div className="presecription-list-tag">Item</div>
                                        <div className="presecription-list-tag">perQuantity</div>
                                        <div className="presecription-list-tag">Quantity</div>
                                        <div className="presecription-list-tag">daily use</div>
                                    </div>
                                    {prescription.map(( p, indx) => {
                                        return (
                                            <li className="prescription-list-row" key={indx}>
                                                <div className="presecription-list-val">{p.bnfName}</div>
                                                <div className="presecription-list-val">{p.price}</div>
                                                <div className="presecription-list-val">{p.item}</div>
                                                <div className="presecription-list-val">{p.perQuantity}</div>
                                                <div className="presecription-list-val">{p.totalQuantity}</div>
                                                <div className="presecription-list-val">{p.adqusage}</div>
                                            </li>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                        :
                        null
                }
                {
                    result ?
                        (
                            <div className="detail-content">
                                <div className="detail-content-info">
                                    <div className="detail-content-info-tag">Test result:</div>
                                    <div className="detail-content-info-val">{result}</div>
                                </div>
                            </div>
                        )
                        :
                        null
                }
                {
                    diagnosis ?
                        (
                            <div className="detail-content">
                                <div className="detail-content-info">
                                    <div className="detail-content-info-tag">Diagnosis:</div>
                                    <div className="detail-content-info-val">{diagnosis}</div>
                                </div>
                            </div>
                        )
                        :
                        null
                }
            </Card>
        </div>
    )
}

export default DetailCard
