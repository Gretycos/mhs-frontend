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
import {getMyDoctorAppointment} from "@/service/appointment/doctorAppointment.js";
import {getMyTestAppointment} from "@/service/appointment/testAppointment.js";

const { Meta } = Card;

const PendingDetail = (props) => {
    const navigate = useNavigate();
    const {params, state, practRole} = props
    const {id} = useParams()
    console.log(practRole, id)
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

    const [prescription, setPrescription] = useState()

    const [result, setResult] = useState()

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


    const getDetailData = async () => {
        // 用id去查数据
        const params = {
            appointId: id,
        }
        // console.log(params)
        const {data} = state.type === "clinic" ?
            await getMyDoctorAppointment(params) : await getMyTestAppointment(params)
        // console.log(data)

        if (state.type === "clinic") {
            setAptData({
                time: data.time,
                ref: data.appointmentId,
                firstName: data.firstName,
                lastName: data.lastName,
                type: parseType(state.type, data.type),
                doctor: data.doctor,
                status: parseStatus(data.status),
            })
        } else {
            setAptData({
                time: data.time,
                ref: data.appointmentId,
                firstName: data.firstName,
                lastName: data.lastName,
                type: parseType(state.type, data.type),
                doctor: data.doctor,
            })
        }

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
