/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./PendingDetail.less";
import {Button, Card, Modal, Select} from 'antd';
import {useEffect, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DetailCard from "@/component/DetailCard/DetailCard.jsx";
import {DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";
import {ArrowBack} from "@mui/icons-material";
import {getpractAppointDetail} from "@/service/appointment/doctorAppointment.js";
import {getMyTestAppointment} from "@/service/appointment/testAppointment.js";
import {getPractRole} from "@/service/user/practitioner.js";

const { Meta } = Card;

const PendingDetail = (props) => {
    const navigate = useNavigate();
    const {params, state, practRole} = props
    const {id} = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alternatives, setAlternatives] = useState();

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

    const [result, setResult] = useState(null)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        getDetailData()
        setAlternatives([
            {
                value: 0,
                label: 'Jimmy',
            },
            {
                value: 1,
                label: 'Lucy',
            },
            {
                value: 2,
                label: 'David',
            },
            {
                value: 3,
                label: 'Sally',
            }
        ])

        getDetailData()
    }, []);


    const getDetailData = async () => {
        // 用id去查数据
        const params = {
            appointId: id,
        }
        // console.log(params)
        const {data} = await getpractAppointDetail(params)

        setDetailData({
            time: data.time,
            ref: data.appointmentId,
            firstName: data.firstName,
            lastName: data.lastName,
            doctor: data.doctor,
            status: parseStatus(data.status),
            type: parseType(state.type, data.type),
            birthday: data.birthday,
            gender: data.gender,
            reason: data.reason,
        })

    }

    const alterModal = () =>{
        return(
            <>
                <Modal open={isModalOpen}
                       centered
                       width={800}
                       onCancel={handleCancel}
                       title={
                           <p className="pending-detail-card-content-font1">Offer an alternative</p>
                       }
                       footer={[
                           <div className="pending-detail-button-container">
                               <Button size={"large"} className="pending-detail-button"
                                       onClick={handleOk}>Confirm</Button>
                           </div>
                       ]}>
                    <div className="pending-detail-modal-container">
                        <div className="pending-detail-select-container">
                            <p className='pending-detail-card-content-font1'>Doctor</p>
                            <Select defaultValue={"choose an alternative doctor"} className="pending-detail-select-tools" options={alternatives}
                                    size={"large"}/>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    return (
        <div className="pending-detail-page-container">
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
            <DetailCard params={params} detailData={detailData} prescription={prescription} result={result} practRole={practRole}/>
            <div className="pending-detail-content-container">
                <div className="pending-detail-button-container">
                    <Button size={"large"} className="pending-detail-button">Accept</Button>
                    {
                        alternatives ?
                            (
                                <Button size={"large"} className="pending-detail-button" onClick={showModal}>Alter</Button>
                            )
                            :
                            (
                                <Button size={"large"} className="pending-detail-button">Reject</Button>
                            )
                    }
                </div>
            </div>
            {alterModal()}
        </div>



    )
}

export default PendingDetail
