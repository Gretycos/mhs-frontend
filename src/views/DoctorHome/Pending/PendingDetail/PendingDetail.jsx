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

const { Meta } = Card;

const PendingDetail = (props) => {
    const navigate = useNavigate();
    const {params, state, role} = props
    const {id} = useParams()
    console.log(state)
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
                            <Select defaultValue="Jimmy" className="pending-detail-select-tools" options={alternatives}
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
        <div className="pending-detail-page-container">
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
            <DetailCard params={params} detailData={detailData} prescription={prescription} result={result} role={role}/>
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
