/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./OngoingDetail.less"
import {Button, Card, Modal, Input, Select, Table, InputNumber} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import DetailCard from "@/component/DetailCard/DetailCard.jsx";
import {getAppointMedHistory} from "@/service/med/medHistory.js";
import {getpractAppointDetail, getpractAppointDetails} from "@/service/appointment/doctorAppointment.js";
import {getTestpractAppointDetail, getTestpractAppointDetails} from "@/service/appointment/testAppointment.js";
import {insertTestReport} from "@/service/med/testReport.js";


const { Meta } = Card;
const { Search} = Input
const { Column } = Table;

const OngoingDetail = (props) => {
    const navigate = useNavigate();
    const {params, state, practRole} = props
    const time = state.time
    const {id} = useParams()
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
            medHistoryId:"",
            testId:"",
            result:""
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

    const [isDiagModalOpen, setIsDiagModalOpen] = useState(false);
    const [isPrescriModalOpen, setIsPrescriModalOpen] = useState(false);
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [drug, setDrug] = useState({})
    const [item, setItem] = useState(1);
    const [daily, setDaily] = useState(1);


    const [testSlot, setTestSlot] = useState();

    const showDiagModal = () => {
        setIsDiagModalOpen(true);
    };
    const showPrescriModal = () => {
        setIsPrescriModalOpen(true);
    };

    const [drugList, setDrugList] = useState([])

    useEffect(() => {
        getDetailData();

        setTestSlot([{
            value: 0,
            label: "09/05/2024 9:00"
        },
            {
                value: 1,
                label: "13/05/2024 10:00"
            }])

        setDrugList([
            {
                index:0,
                BNF_code: "fwwfwfwfwefweef",
                BNF_name: "medicine 1",
                quantity: 12,
                price: 10,
                action: <Button onClick={()=>showDrugModal(0)}>select</Button>
            },
            {
                index:1,
                BNF_code: "fwwfwfwfwefwedf",
                BNF_name: "medicine 2",
                quantity: 12,
                price: 10,
                action: <Button onClick={()=>showDrugModal(1)}>select</Button>
            },
            {
                index:2,
                BNF_code: "fwwfwfwfwefweaf",
                BNF_name: "medicine 3",
                quantity: 12,
                price: 10,
                action: <Button onClick={()=>showDrugModal(2)}>select</Button>
            }
        ])

        setPrescription([])

    }, []);

    const getDetailData = async () => {
        // 用id去查数据
        const params1 = {
            appointId: id
        }

        const res1 = practRole === 0 ? await getpractAppointDetails(params1) : await getTestpractAppointDetails(params1)

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
            medHistoryId:res1.data.medHistoryId,
            testId:res1.data.testId,
            result:res1.data.result,
            patientId:res1.data.patientId,
            practId:res1.data.practId
        })

        setDiagnosis(res1.data.diagnosis)

    }

    const showDrugModal = (index) => {
        setDrug(drugList.find(item => {return item.index === index}));
        console.log(drugList.find(item => {return item.index === index}))
        setIsDrugModalOpen(true);

    };
    const showTestModal = () => {
        setIsTestModalOpen(true);
    };


    const handleDiagOk = () => {
        setIsDiagModalOpen(false);
    };

    const handlePrescriOk = () => {
        setIsPrescriModalOpen(false);
    };

    const handleDrugOk = () => {

        addPrescriptionList();
        setItem(1);
        setDaily(1);
        setIsDrugModalOpen(false);

    };

    const handleTestOk = () =>{
        setIsTestModalOpen(false);
    }

    const handleDiagCancel = () => {
        setIsDiagModalOpen(false);
    };

    const handlePrescriCancel = () => {
        setIsPrescriModalOpen(false);
    };

    const handleDrugCancel = () => {
        setIsDrugModalOpen(false);
    };

    const handleTestCancel = () => {
        setIsTestModalOpen(false);
    };


    const handleItemChange = (value) => {
        setItem(value);
    };

    const handleDailyChange = (value) => {
        setDaily(value);
    };

    const handleInputChange = (e) =>{
        setDiagnosis(e.target.value)
    }

    const testType = [
        {
            value: 0,
            label: 'EyeSight',
        },
        {
            value: 1,
            label: 'Height and Weight',
        },
        {
            value: 2,
            label: "Blood Pressure"
        },
        {
            value: 3,
            label: "Blood Sugar"
        },
        {
            value: 4,
            label: "Audiometry"
        }
    ]

    const updateData = () => {
        console.log('update list')
    }

    const insertDiagnosis = async () =>{
        const params = {
            patientId:detailData.patientId,
            practId:detailData.practId,
            testType:state.type,
            result: diagnosis,
            diagnosis: diagnosis,
            medHistoryId: detailData.medHistoryId
        }
        practRole === 0 ? await insertPrescri(params):await insertTestReport(params);
        navigate(-1, {update: () => updateData()})
    }

    const addPrescriptionList = () => {
        let data = prescription;
        if(data.find(result => {return result.index === drug.index})){
            data.map(result => {
                if (result.index === drug.index) {
                    result.item = item;
                    result.daily = daily;
                }
            })
        }
        else{
            data.push({
                index:drug.index,
                BNF_code: drug.BNF_code,
                BNF_name: drug.BNF_name,
                quantity: drug.quantity,
                price: drug.price,
                item: item,
                daily: daily,
                action: <button onClick={()=>removeData(drug.index)}>remove</button>
            })
        }


        setPrescription([...data])
    }

    const removeData = (index) => {
        let data = prescription.filter(item => item.index !== index);
        setPrescription([...data]);
    }


    const onPrescriSearch = () => {

    }
    
    const diagModal = () =>{
        return(
            <>
                <Modal open={isDiagModalOpen}
                       centered
                       width={1000}
                       onCancel={handleDiagCancel}
                       title={
                           <p className="ongoing-detail-card-content-font1">Diagnosis</p>
                       }
                       footer={[
                           <div className="ongoing-detail-button-container">
                               <Button size={"large"} className="ongoing-detail-button" onClick={handleDiagOk}>Save</Button>
                           </div>
                       ]}>
                    <div className="ongoing-detail-modal-container">
                        <div className="ongoing-detail-input-container">
                            <Input.TextArea className="ongoing-detail-input" rows={10} placeholder="please enter diagnosis" onChange={e => handleInputChange(e)}/>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    const prescriModal = () =>{
        return(
            <>
                <Modal open={isPrescriModalOpen}
                       centered
                       width={1000}
                       onCancel={handlePrescriCancel}
                       title={
                           <p className="ongoing-detail-card-content-font1">Prescription</p>
                       }
                       footer={[
                           <div className="ongoing-detail-button-container">
                               <Button size={"large"} className="ongoing-detail-button" onClick={handlePrescriOk}>Save</Button>
                           </div>
                       ]}>
                    <div className="ongoing-detail-modal-container">
                        <div className="ongoing-detail-select-container" key={0}>
                            <Search className="ongoing-detail-search" placeholder="input search text"
                                    onSearch={onPrescriSearch} enterButton/>
                        </div>
                        <div className="ongoing-detail-list-container" key={1}>
                            <Table dataSource={drugList} className="ongoing-table-style">
                                <Column title="BNF_Code" dataIndex="BNF_code" key="BNF_code"/>
                                <Column title="BNF_Name" dataIndex="BNF_name" key="BNF_name"/>
                                <Column title="Quantity" dataIndex="quantity" key="quantity"/>
                                <Column title="Price" dataIndex="price" key="price"/>
                                <Column title="Action" dataIndex="action" key="action"/>
                            </Table>
                        </div>
                        <div className="ongoing-detail-list-container" key={2}>
                            <Table dataSource={prescription} className="ongoing-table-style">
                                <Column title="BNF_Code" dataIndex="BNF_code" key="BNF_code"/>
                                <Column title="BNF_Name" dataIndex="BNF_name" key="BNF_name"/>
                                <Column title="Quantity" dataIndex="quantity" key="quantity"/>
                                <Column title="Price" dataIndex="price" key="price"/>
                                <Column title="Item" dataIndex="item" key="item"/>
                                <Column title="Daily" dataIndex="daily" key="daily"/>
                                <Column title="Action" dataIndex="action" key="action"/>
                            </Table>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    const drugModal = () => {
        console.log(drug, item, daily)
        return (
            <>
                <Modal open={isDrugModalOpen}
                       centered
                       width={1000}
                       onCancel={handleDrugCancel}
                       title={
                           <p className="ongoing-detail-card-content-font1">{drug.BNF_name}</p>
                       }
                       footer={[
                           <div className="ongoing-detail-button-container">
                               <Button size={"large"} className="ongoing-detail-button" onClick={handleDrugOk}>Save</Button>
                           </div>
                       ]}>
                    <div className="ongoing-detail-modal-container">
                        <div className="ongoing-detail-select-container" key={1}>
                            <p className='ongoing-detail-card-content-font1'>Item</p>
                            <InputNumber className="ongoing-detail-select-tools" min={1} max={99} defaultValue={item} value={item} changeOnWheel onChange={handleItemChange}/>
                        </div>
                        <div className="ongoing-detail-select-container" key={2}>
                            <p className='ongoing-detail-card-content-font1'>Daily</p>
                            <InputNumber className="ongoing-detail-select-tools" min={1} max={99} defaultValue={daily} value={daily} changeOnWheel onChange={handleDailyChange}/>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    const testModal = () => {
        return (
            <>
                <Modal open={isTestModalOpen}
                       centered
                       width={1000}
                       onCancel={handleTestCancel}
                       title={
                           <p className="ongoing-detail-card-content-font1">Additional Test</p>
                       }
                       footer={[
                           <div className="ongoing-detail-button-container">
                               <Button size={"large"} className="ongoing-detail-button"
                                       onClick={handleTestOk}>Save</Button>
                           </div>
                       ]}>
                <div className="ongoing-detail-modal-container">
                        <div className="ongoing-detail-select-container" key={1}>
                            <p className='ongoing-detail-card-content-font1'>Type</p>
                            <Select defaultValue="--choose test type--" className="ongoing-detail-select-tools" options={testType}
                                    size={"large"}/>
                        </div>
                        <div className="ongoing-detail-select-container" key={2}>
                            <p className='ongoing-detail-card-content-font1'>Test</p>
                            <Select defaultValue="--choose test slot--" className="ongoing-detail-select-tools" options={testSlot}
                                    size={"large"}/>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    return (
        <div className="ongoing-detail-page-container">
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
            <DetailCard params={params} detailData={detailData} result={result}
                        practRole={practRole} title={title}/>
            <div className="ongoing-detail-content-container">
                <div className="ongoing-detail-button-container">
                    <Button size={"large"} className="ongoing-detail-button" onClick={showDiagModal}>Diagnosis</Button>
                    {
                        practRole === 0 ?
                            (
                                <>
                                    <Button size={"large"} className="ongoing-detail-button" onClick={showPrescriModal}>Prescription</Button>
                                    <Button size={"large"} className="ongoing-detail-button" onClick={showTestModal}>Test</Button>
                                </>

                            )
                        :
                        null
                    }

                </div>
            </div>
            {diagModal()}
            {prescriModal()}
            {drugModal()}
            {testModal()}
        </div>
    )
}

export default OngoingDetail;
