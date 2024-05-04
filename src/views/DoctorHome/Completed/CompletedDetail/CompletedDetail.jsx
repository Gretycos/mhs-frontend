/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./CompletedDetail.less"
import { Button, Card} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const { Meta } = Card;

const CompletedDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();

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

    const title = () => {
        return (
            <div className="completed-detail-card-title">
                <div className="completed-detail-card-title-line">
                    <p className='completed-detail-card-title-font1'>{data.date}, {data.time}</p>
                    <p className='completed-detail-card-title-font2'>Medical Record</p>
                    <p className='completed-detail-card-title-font3'>Ref: {id}</p>
                </div>
                <div className="completed-detail-card-title-line">
                    <p className='completed-detail-card-title-font3'>Name: {data.patient_name}</p>
                    <p className='completed-detail-card-title-font3'>Age: {data.age}</p>
                    <p className='completed-detail-card-title-font3'>Gender: {data.gender}</p>
                </div>
                <div className="completed-detail-card-title-line">
                    <p className='completed-detail-card-title-font3'>Doctor: {data.doctor_name}</p>
                </div>
            </div>
        )
    }

    const contentTitle1 = () => {
        return <p className='completed-detail-card-content-font1'>Patient Description</p>;
    }

    const content1 = () => {
        return <p className='completed-detail-card-content-font2'>{data.reason}</p>;
    }

    const contentTitle2 = () => {
        return <p className='completed-detail-card-content-font1'>Test Report</p>;
    }

    const content2 = () => {
        return <a className='completed-detail-card-content-font2' href={data.test_report} target="_blank" rel="noopener noreferrer">Click here to see the test report</a>;
    }

    const contentTitle3 = () => {
        return <p className='completed-detail-card-content-font1'>Diagnosis</p>;
    }

    const content3 = () => {
        return <p className='completed-detail-card-content-font2' >{data.diagnosis}</p>;
    }

    return (
        <div className="completed-detail-page-container">
            <div className="completed-detail-head-container">
                <p className="completed-detail-head-font">Completed Request</p>
                <div className="completed-detail-head-line"/>
            </div>
            <div className="completed-detail-content-container">
                <div className='completed-back-cotainer'>
                    <Button type='text' className="completed-back-button" onClick={goBack}
                            icon={<KeyboardBackspaceIcon className="completed-back-imgs"/>}>
                        back
                    </Button>
                </div>
                <div className="completed-detail-card-container">
                    <Card className={"completed-detail-card-style"} title={title()} hoverable={true} bordered={true}>
                        <Meta className="completed-detail-card-content" title={contentTitle1()}
                              description={content1()}/>
                        <div className="completed-detail-card-line"/>
                        <Meta className="completed-detail-card-content" title={contentTitle2()}
                              description={content2()}/>
                        <div className="completed-detail-card-line"/>
                        <Meta className="completed-detail-card-content" title={contentTitle3()}
                              description={content3()}/>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CompletedDetail
