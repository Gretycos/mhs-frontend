/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./CompletedDetail.less"
import { Button, Card} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {ArrowBack} from "@mui/icons-material";
import DetailCard from "@/component/DetailCard/DetailCard.jsx";
import {useEffect, useState} from "react";

const { Meta } = Card;

const CompletedDetail = (props) => {
    const navigate = useNavigate();
    const {params, state, practRole} = props
    const {id} = useParams()
    console.log(practRole)

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
            diagnosis: "",
        }
    )

    const [prescription, setPrescription] = useState()

    const [result, setResult] = useState()

    useEffect(() => {
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
            diagnosis: "diagnosis1",
        })

        setPrescription([{
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
            }])

        setResult("result1")
    }, []);



    return (
        <div className="completed-detail-page-container">
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
            <DetailCard params={params} detailData={detailData} prescription={prescription} result={result}
                        practRole={practRole}/>
        </div>
    )
}

export default CompletedDetail
