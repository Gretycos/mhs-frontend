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
import {getAvailableList, getpractAppointDetail, updateStatus} from "@/service/appointment/doctorAppointment.js";
import {getMyTestAppointment} from "@/service/appointment/testAppointment.js";
import {getPractRole} from "@/service/user/practitioner.js";

const { Meta } = Card;

const PendingDetail = (props) => {
    const navigate = useNavigate();
    const {params, state, practRole} = props
    const time = state.time

    const {id} = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alternatives, setAlternatives] = useState();
    const [alter, setAlter] = useState();
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setStatus(2)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const accept = () =>{
        setStatus(1)
    }

    const reject = () =>{
        setStatus(3)
    }

    useEffect(() => {
        getDetailData()
    }, []);


    const getDetailData = async () => {
        // 用id去查数据
        const params1 = {
            appointId: id
        }

        const params2 = {
            appointTime: time
        }
        console.log(params1)
        console.log(params2)
        const res1 = await getpractAppointDetail(params1)
        const res2 = await getAvailableList(params2)

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

        var alterList = []
        var key = 0;

        res2.data.forEach(d => {
            alterList.push({
                value: key,
                label: d.name,
                practId: d.practId
            })
            key = key + 1
        })
        setAlternatives(alterList)

    }

    const updateData = () => {
        console.log('update list')
    }

    const setStatus = async (value)=>{
        const params = {
            doctorAppointId: id,
            status: value,
            practId: alter,
        }
        updateStatus(params)
        navigate(-1, {update: () => updateData()})
    }

    const onOptionChange =  (value) => {
        console.log(`option change: ${value}`)
        setAlter(alternatives[value].practId)
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
                            <Select  className="pending-detail-select-tools" defaultValue={"--select an alternative doctor--"} options={alternatives}
                                    size={"large"} autoFocus={true} onChange={(val) => onOptionChange(val)} />
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    return (
        <div className="pending-detail-page-container">
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
            <DetailCard params={params} detailData={detailData} prescription={prescription} result={result} practRole={practRole} title={"Appointment Record"} diagnosis={diagnosis}/>
            <div className="pending-detail-content-container">
                <div className="pending-detail-button-container">
                    <Button size={"large"} className="pending-detail-button" onClick={accept}>Accept</Button>
                    {
                        alternatives ?
                            (
                                <Button size={"large"} className="pending-detail-button" onClick={showModal}>Alter</Button>
                            )
                            :
                            (
                                <Button size={"large"} className="pending-detail-button" onClick={reject}>Reject</Button>
                            )
                    }
                </div>
            </div>
            {alterModal()}
        </div>



    )
}

export default PendingDetail
