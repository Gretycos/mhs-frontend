/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Pending.less"
import { Select, Card, Pagination } from 'antd';
import { useState} from "react";
import { Link} from "react-router-dom";

const Pending = () => {

    const opts = [
        {
            value: 0,
            label: 'This week',
        },
        {
            value: 1,
            label: 'Next week',
        },
        {
            value: 2,
            label: 'Next two weeks',
        },
        {
            value: 8,
            label: 'Next eight weeks',
        },
        {
            value: 16,
            label: 'Next sixteen weeks',
        },
    ]

    const getListData = (value) => {
        let listData;
        switch (value) {
            case 0:
                listData = [
                    {
                        id: '00000000',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000000',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '11111111',
                        date: '2024/03/23',
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
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000000',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '11111111',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000001',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '22222222',
                        date: '2024/03/27',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000002',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '33333333',
                        date: '2024/03/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000003',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                ];
                break;
            case 2:
                listData = [
                    {
                        id: '00000000',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000000',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '11111111',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000001',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '22222222',
                        date: '2024/03/27',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000002',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '33333333',
                        date: '2024/03/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000003',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '44444444',
                        date: '2024/04/01',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000004',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '55555555',
                        date: '2024/04/02',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000005',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '66666666',
                        date: '2024/04/04',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000006',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '77777777',
                        date: '2024/04/05',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000007',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                ];
                break;
            case 8:
                listData = [
                    {
                        id: '00000000',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000000',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '11111111',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000001',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '22222222',
                        date: '2024/03/27',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000002',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '33333333',
                        date: '2024/03/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000003',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '44444444',
                        date: '2024/04/01',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000004',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '55555555',
                        date: '2024/04/02',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000005',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '66666666',
                        date: '2024/04/04',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000006',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '77777777',
                        date: '2024/04/05',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000007',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '88888888',
                        date: '2024/04/06',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000008',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '99999999',
                        date: '2024/04/08',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000009',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000002',
                        date: '2024/04/13',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000010',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000003',
                        date: '2024/04/18',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000011',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000004',
                        date: '2024/04/25',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000012',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000005',
                        date: '2024/04/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000013',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000006',
                        date: '2024/05/02',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000014',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000007',
                        date: '2024/05/13',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000015',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                ];
                break;
            case 16:
                listData = [
                    {
                        id: '00000000',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000000',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '11111111',
                        date: '2024/03/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000001',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '22222222',
                        date: '2024/03/27',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000002',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '33333333',
                        date: '2024/03/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000003',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '44444444',
                        date: '2024/04/01',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000004',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '55555555',
                        date: '2024/04/02',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000005',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '66666666',
                        date: '2024/04/04',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000006',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '77777777',
                        date: '2024/04/05',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000007',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '88888888',
                        date: '2024/04/06',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000008',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '99999999',
                        date: '2024/04/08',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000009',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000002',
                        date: '2024/04/13',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000010',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000003',
                        date: '2024/04/18',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000011',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000004',
                        date: '2024/04/25',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000012',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000005',
                        date: '2024/04/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000013',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000006',
                        date: '2024/05/02',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000014',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000007',
                        date: '2024/05/13',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000015',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000008',
                        date: '2024/05/17',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000016',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000009',
                        date: '2024/05/18',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000017',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000010',
                        date: '2024/05/20',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000018',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000011',
                        date: '2024/05/23',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000019',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000012',
                        date: '2024/05/27',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000020',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000013',
                        date: '2024/06/01',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000021',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000014',
                        date: '2024/06/03',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000022',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000015',
                        date: '2024/06/06',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000023',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000016',
                        date: '2024/06/10',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000024',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000017',
                        date: '2024/06/12',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000025',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000018',
                        date: '2024/06/14',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'000000226',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000019',
                        date: '2024/06/15',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000027',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000020',
                        date: '2024/06/20',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000028',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000021',
                        date: '2024/06/25',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000029',
                        patient_name: "liu",
                        reason:'My leg is pain.'
                    },
                    {
                        id: '00000022',
                        date: '2024/06/31',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000030',
                        patient_name: "liu",
                        reason:'My arm is pain.'
                    },
                    {
                        id: '00000023',
                        date: '2024/07/07',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000031',
                        patient_name: "liu",
                        reason:'My head is pain.'
                    },
                    {
                        id: '00000024',
                        date: '2024/07/13',
                        time:'09:15-09:30',
                        day:'Saturday',
                        patient_id:'00000032',
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
        setCurrentListData(getListData(value));

    }

    const title = (data) => {
        return <span className="completed-card-title">{data.day}, {data.date}, {data.time}</span>
    }

    const renderCards = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return listdata.slice(startIndex, endIndex).map((data) => (
            <Link to={'/doctor/pending/details/${data.id}'} key={data.id}>
                <Card className={"pending-card-style"} title={title(data)} hoverable={true} bordered={true}>
                    <p className="pending-card-content1">{data.patient_name}</p>
                    <p className="pending-card-content2">{data.reason}</p>
                </Card>
            </Link>
        ));
    };

    return (
        <div className="pending-page-container">
            <div className="pending-head-container">
                <p className="pending-head-font">Pending Request</p>
                <div className="pending-head-line" />
            </div>
            <div className="pending-content-container">
                <Select defaultValue="This week" className="pending-select-tools" onChange={handleDataChange} options={opts}
                        size={"large"}/>
                <div className="pending-list-container">
                    {renderCards()}
                    <Pagination
                        className="pending-pagination-style"
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

export default Pending
