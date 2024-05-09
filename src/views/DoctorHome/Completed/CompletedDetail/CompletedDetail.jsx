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
import {getAvailableList, getpractAppointDetail} from "@/service/appointment/doctorAppointment.js";
import {getTestpractAppointDetail} from "@/service/appointment/testAppointment.js";
import {getAppointMedHistory} from "@/service/med/medHistory.js";

const { Meta } = Card;

const CompletedDetail = (props) => {
    const navigate = useNavigate();
    const {params, state, practRole} = props
    const {id} = useParams()
    const time = state.time

    const title = practRole === 0 ? "Doctor Appointment Record" : "Test Appointment Record"


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
                case 0: type += "EyeSight"; break;
                case 1: type += "Height and Weight"; break;
                case 2: type += "Blood Pressure"; break;
                case 3: type += "Blood Sugar"; break;
                case 4: type += "Audiometry"; break;
            }
        }
        return type
    }

    const parseStatus = (status) => {
        let s
        switch (status){
            case 0: s = "unfulfilled"; break;
            case 1: s = "accepted"; break;
            case 2: s = "transferred"; break;
            case 3: s = "rejected"; break;
            case 4: s = "completed"; break;
            default: s = "unfulfilled"; break;
        }
        return s
    }

    const [prescription, setPrescription] = useState()

    const [result, setResult] = useState()

    const [diagnosis, setDiagnosis] = useState()

    useEffect(() => {
        getDetailData()
    }, []);

    const getDetailData = async () => {
        // 用id去查数据
        const params1 = {
            appointId: id
        }


        console.log(params2)
        const res1 = practRole === 0 ? await getpractAppointDetail(params1) : await getTestpractAppointDetail(params1)

        setDetailData({
            time: time,
            ref: res1.data.appointmentId,
            firstName: res1.data.firstName,
            lastName: res1.data.lastName,
            doctor: res1.data.doctor,
            status: parseStatus(res1.data.status),
            type: parseType(state.type, res1.data.type),
            birthday: res1.data.birthday,
            gender: res1.data.gender,
            reason: res1.data.reason,
        })


    }


    return (
        <div className="completed-detail-page-container">
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
            <DetailCard params={params} detailData={detailData} prescription={prescription} result={result}
                        practRole={practRole} title={title}  diagnosis={diagnosis}/>
        </div>
    )
}

export default CompletedDetail
