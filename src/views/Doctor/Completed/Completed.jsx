/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Completed.less"
import {Link} from "react-router-dom";
import {useState} from "react";
import {Card, Pagination, DatePicker} from "antd";
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';

const Completed = () => {
    let date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    const dateFormat = 'YYYY-MM-DD';
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > dayjs().endOf('day');
    };

    // 设置默认日期为今天
    const getListData = (value) => {
        let listData;
        switch (value) {
            case 0:
                listData = [
                    {
                        id: '00000000',
                        date: '2023/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000000',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '11111111',
                        date: '2023/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000001',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                ];
                break;
            case 1:
                listData = [
                    {
                        id: '00000000',
                        date: '2023/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000000',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '11111111',
                        date: '2023/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000001',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '22222222',
                        date: '2023/03/27',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000002',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '33333333',
                        date: '2023/03/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000003',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                ];
                break;
            default:
        }
        return listData || [];
    };


    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [listdata, setCurrentListData] = useState(getListData(0));

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleDataChange = (value) =>{
        if(listdata.length == 2){
            setCurrentListData(getListData(1));
        }
        else{
            setCurrentListData(getListData(0));
        }
    }

    const title = (data) => {
        return <span className="completed-card-title">{data.day}, {data.date}, {data.time}</span>
    }

    const renderCards = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return listdata.slice(startIndex, endIndex).map((data) => (

            <Link to={'/doctor/completed/details/${data.id}'} key={data.id}>
                <Card className={"completed-card-style"} title={title(data)} hoverable={true} bordered={true}>
                    <p className="completed-card-content1">{data.patient_name}</p>
                    <p className="completed-card-content2">{data.reason}</p>
                </Card>
            </Link>
        ));
    };

    return (
        <div className="completed-page-container">
            <div className="completed-head-container">
                <p className="completed-head-font">Completed Request</p>
                <div className="completed-head-line" />
            </div>
            <div className="completed-content-container">
                <RangePicker
                    className="completed-select-tools"
                    onChange={handleDataChange}
                    defaultValue={dayjs(currentDate, dateFormat)}
                    maxDate={dayjs(currentDate, dateFormat)}
                    format={dateFormat}
                    size={"large"}
                />
                <div className="completed-list-container">
                    {renderCards()}
                    <Pagination
                        className="completed-pagination-style"
                        current={currentPage}
                        pageSize={pageSize}
                        total={listdata.length}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Completed
