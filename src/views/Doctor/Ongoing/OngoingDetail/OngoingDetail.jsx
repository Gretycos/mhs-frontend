/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./OngoingDetail.less"
import {Button, Card, Modal, Input, Select, Table, InputNumber} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useState} from "react";

const { Meta } = Card;
const { Search} = Input
const { Column } = Table;

const OngoingDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [isDiagModalOpen, setIsDiagModalOpen] = useState(false);
    const [isPrescriModalOpen, setIsPrescriModalOpen] = useState(false);
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [drug, setDrug] = useState({})
    const [item, setItem] = useState(1);
    const [daily, setDaily] = useState(1);
    const [listdata2, setListData2] = useState([]);

    const showDiagModal = () => {
        setIsDiagModalOpen(true);
    };
    const showPrescriModal = () => {
        setIsPrescriModalOpen(true);
    };

    const showDrugModal = (index) => {
        setDrug(listdata.find(item => item.index === index));
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

        addDataList();
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

    const handleSelectChange = (value) =>{
        setOpts2(getOpts2(value));
        setDefaultValue(opts2[0].label)
    }

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

    const opts1 = [
        {
            value: 0,
            label: 'Blood',
        },
        {
            value: 1,
            label: 'Body',
        },
    ]

    const getOpts2 = (value) => {
        let opts2;
        switch (value) {
            case 0:
                opts2 = [
                    {
                        value: 0,
                        label: 'Blood Sugar'
                    },
                    {
                        value: 1,
                        label: 'Blood lipids'
                    },
                ];
                break;
            case 1:
                opts2= [
                    {
                        value: 0,
                        label: 'Height'
                    },
                    {
                        value: 1,
                        label: 'Weight'
                    },
                    {
                        value: 2,
                        label: 'Blood Pressure'
                    }
                ];
                break;
            default:
        }
        return opts2 || [];
    };

    const [opts2, setOpts2] = useState(getOpts2(0));
    const [defaultValue, setDefaultValue] = useState(opts2[0].label);

    const listdata = [
        {
            index:"fwwfwfwfwefweef",
            BNF_code: "fwwfwfwfwefweef",
            BNF_name: "medicine 1",
            quantity: 12,
            price: 10,
            action: <Button onClick={()=>showDrugModal("fwwfwfwfwefweef",)}>select</Button>
        },
        {
            index:"fwwfwfwfwefwedf",
            BNF_code: "fwwfwfwfwefwedf",
            BNF_name: "medicine 2",
            quantity: 12,
            price: 10,
            action: <Button onClick={()=>showDrugModal("fwwfwfwfwefwedf",)}>select</Button>
        },
        {
            index:"fwwfwfwfwefweaf",
            BNF_code: "fwwfwfwfwefweaf",
            BNF_name: "medicine 3",
            quantity: 12,
            price: 10,
            action: <Button onClick={()=>showDrugModal("fwwfwfwfwefweaf",)}>select</Button>
        }
    ]

    const addDataList = () => {
        let data = listdata2;
        if(data.find(result => result.index === drug.index)){
            data.map(result => {
                if (result.index === result.index) {
                    // 在此处更新找到的数据
                    // 例如，你可以修改 item 中的某个属性
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


        setListData2([...data])
    }

    const removeData = (index) => {
        let data = listdata2.filter(item => item.index !== index);
        setListData2([...data]);
    }

    const title = () => {
        return (
            <div className="ongoing-detail-card-title">
                <div className="ongoing-detail-card-title-line">
                    <p className='ongoing-detail-card-title-font1'>{data.date}, {data.time}</p>
                    <p className='ongoing-detail-card-title-font2'>Medical Record</p>
                    <p className='ongoing-detail-card-title-font3'>Ref: {id}</p>
                </div>
                <div className="ongoing-detail-card-title-line">
                    <p className='ongoing-detail-card-title-font3'>Name: {data.patient_name}</p>
                    <p className='ongoing-detail-card-title-font3'>Age: {data.age}</p>
                    <p className='ongoing-detail-card-title-font3'>Gender: {data.gender}</p>
                </div>
                <div className="ongoing-detail-card-title-line">
                    <p className='ongoing-detail-card-title-font3'>Doctor: {data.doctor_name}</p>
                </div>
            </div>
        )
    }

    const contentTitle1 = () => {
        return <p className='ongoing-detail-card-content-font1'>Patient Description</p>;
    }

    const content1 = () => {
        return <p className='ongoing-detail-card-content-font2'>{data.reason}</p>;
    }

    const contentTitle2 = () => {
        return <p className='ongoing-detail-card-content-font1'>Test Report</p>;
    }

    const content2 = () => {
        return <a className='ongoing-detail-card-content-font2' href={data.test_report} target="_blank" rel="noopener noreferrer">Click here to see the test report</a>;
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
                            <Input.TextArea className="ongoing-detail-input" rows={10} placeholder="please enter diagnosis"/>
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
                            <Table dataSource={listdata} className="ongoing-table-style">
                                <Column title="BNF_Code" dataIndex="BNF_code" key="BNF_code"/>
                                <Column title="BNF_Name" dataIndex="BNF_name" key="BNF_name"/>
                                <Column title="Quantity" dataIndex="quantity" key="quantity"/>
                                <Column title="Price" dataIndex="price" key="price"/>
                                <Column title="Action" dataIndex="action" key="action"/>
                            </Table>
                        </div>
                        <div className="ongoing-detail-list-container" key={2}>
                            <Table dataSource={listdata2} className="ongoing-table-style">
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
                            <InputNumber className="ongoing-detail-select-tools" min={1} max={99} defaultValue={item} changeOnWheel onChange={handleItemChange}/>
                        </div>
                        <div className="ongoing-detail-select-container" key={2}>
                            <p className='ongoing-detail-card-content-font1'>Daily</p>
                            <InputNumber className="ongoing-detail-select-tools" min={1} max={99} defaultValue={daily} changeOnWheel onChange={handleDailyChange}/>
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
                            <Select defaultValue="Blood" className="ongoing-detail-select-tools" options={opts1}
                                    size={"large"} onChange={handleSelectChange}/>
                        </div>
                        <div className="ongoing-detail-select-container" key={2}>
                            <p className='ongoing-detail-card-content-font1'>Test</p>
                            <Select defaultValue={defaultValue} className="ongoing-detail-select-tools" options={opts2}
                                    size={"large"}/>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    return (
        <div className="ongoing-detail-page-container">
            <div className="ongoing-detail-head-container">
                <p className="ongoing-detail-head-font">Ongoing Request</p>
                <div className="ongoing-detail-head-line"/>
            </div>
            <div className="ongoing-detail-content-container">
                <div className='ongoing-back-cotainer'>
                    <Button type='text' className="ongoing-back-button" onClick={goBack}
                            icon={<KeyboardBackspaceIcon className="ongoing-back-imgs"/>}>
                        back
                    </Button>
                </div>
                <div className="ongoing-detail-card-container">
                    <Card className={"ongoing-detail-card-style"} title={title()} hoverable={true} bordered={true}>
                        <Meta className="ongoing-detail-card-content" title={contentTitle1()}
                              description={content1()}/>
                        <div className="ongoing-detail-card-line"/>
                        <Meta className="ongoing-detail-card-content" title={contentTitle2()}
                              description={content2()}/>
                    </Card>
                </div>
                <div className="ongoing-detail-button-container">
                    <Button size={"large"} className="ongoing-detail-button" onClick={showDiagModal}>Diagnosis</Button>
                    <Button size={"large"} className="ongoing-detail-button" onClick={showPrescriModal}>Prescription</Button>
                    <Button size={"large"} className="ongoing-detail-button" onClick={showTestModal}>Test</Button>
                </div>
            </div>
            {diagModal()}
            {prescriModal()}
            {drugModal()}
            {testModal()}
        </div>
    )
}

export default OngoingDetail
