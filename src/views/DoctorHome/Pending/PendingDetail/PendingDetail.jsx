/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./PendingDetail.less";
import {Button, Card, Modal, Select} from 'antd';
import { useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DetailCard from "@/component/DetailCard/DetailCard.jsx";

const { Meta } = Card;

const PendingDetail = (props) => {
    const navigate = useNavigate();
    const {params, state} = props
    const {id} = useParams()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const goBack = () => {
        navigate(-1); // 返回上一页
    };

    const data = {
        id: id,
        date: '2024/06/31',
        time:'09:15-09:30',
        Ref:'M3221982',
        patient_id:'00000030',
        patient_name: "liu",
        age: 56,
        gender:'Male',
        doctor_id:'00000001',
        doctor_name:'Jane',
        reason:'My arm is pain.',
        test_report:"https://www.pexels.com/zh-cn/photo/17314093/",
        diagnosis:"Sleep More",
        med_history_id:'00000002'
    }

    const opts = [
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
    ]

    const title = () => {
        return (
            <div className="pending-detail-card-title">
                <div className="pending-detail-card-title-line">
                    <p className='pending-detail-card-title-font1'>{data.date}, {data.time}</p>
                    <p className='pending-detail-card-title-font2'>Medical Record</p>
                    <p className='pending-detail-card-title-font3'>Ref: {id}</p>
                </div>
                <div className="pending-detail-card-title-line">
                    <p className='pending-detail-card-title-font3'>Name: {data.patient_name}</p>
                    <p className='pending-detail-card-title-font3'>Age: {data.age}</p>
                    <p className='pending-detail-card-title-font3'>Gender: {data.gender}</p>
                </div>
                <div className="pending-detail-card-title-line">
                    <p className='pending-detail-card-title-font3'>Doctor: {data.doctor_name}</p>
                </div>
            </div>
        )
    }

    const contentTitle1 = () => {
        return <p className='pending-detail-card-content-font1'>Patient Description</p>;
    }

    const content1 = () => {
        return <p className='pending-detail-card-content-font2'>{data.reason}</p>;
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
                            <Select defaultValue="Jimmy" className="pending-detail-select-tools" options={opts}
                                    size={"large"}/>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    return (
       /* <div className="pending-detail-page-container">
            <div className="pending-detail-head-container">
                <p className="pending-detail-head-font">Pending Request</p>
                <div className="pending-detail-head-line"/>
            </div>
            <div className="pending-detail-content-container">
                <div className='pending-back-cotainer'>
                    <Button type='text' className="pending-back-button" onClick={goBack}
                            icon={<KeyboardBackspaceIcon className="pending-back-imgs"/>}>
                        back
                    </Button>
                </div>
                <div className="pending-detail-card-container">
                    <Card className={"pending-detail-card-style"} title={title()} hoverable={true} bordered={true}>
                        <Meta className="pending-detail-card-content" title={contentTitle1()}
                              description={content1()}/>
                    </Card>
                </div>
                <div className="pending-detail-button-container">
                    <Button size={"large"} className="pending-detail-button">Accept</Button>
                    <Button size={"large"} className="pending-detail-button">Reject</Button>
                    <Button size={"large"} className="pending-detail-button" onClick={showModal}>Alter</Button>
                </div>
            </div>
            {alterModal()}
        </div>*/

        <>
            <DetailCard params={params}/>
            <div className="pending-detail-content-container">
                <div className="pending-detail-button-container">
                    <Button size={"large"} className="pending-detail-button">Accept</Button>
                    <Button size={"large"} className="pending-detail-button">Reject</Button>
                    <Button size={"large"} className="pending-detail-button" onClick={showModal}>Alter</Button>
                </div>
            </div>
            {alterModal()}
        </>
    )
}

export default PendingDetail
