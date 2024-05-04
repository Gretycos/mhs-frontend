/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Pending.less"
import { Select, Card, Pagination } from 'antd';
import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";

const Pending = () => {

    const location = useLocation();
    const params = useParams()

    const {pathname, state} = location

    console.log(state)

    const dateOptions = [
        {
            value: 0,
            label: "Next 7 Days",
        },
        {
            value: 2,
            label: "Next 2 weeks",
        },
        {
            value: 3,
            label: "Next 4 weeks",
        },
        {
            value: 4,
            label: "Next 8 weeks",
        },
    ]

    const selectors = [
        {
            title: "Date Range",
            key: "dateRange", // 当作后续发请求的参数变量名
            options: dateOptions,
        },
    ]

    const getData = (params) => {
        console.log("sending request:", params)
        return {
            code: 200,
            msg: "ok",
            data: {
                page: 1,
                totalSize: 100,
                data: [
                    {
                        id: '00000000',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000001',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000002',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000003',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                ],
            }
        }
    }

    return (
        <UserFramework
            state={state}
            pathname={pathname}
            params={params}
            selectors={selectors}
            getData={getData}
            Detail={PendingAppointmentDetail}
        />
    )


/*    const pageSize = 10;


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
    )*/
}

const PendingAppointmentDetail = (props) => {
    const {params, state} = props
    const {id} = params
    const [aptData, setAptData] = useState(
        {
            ref: "",
            firstName: "",
            lastName: "",
            doctor: "",
            time: "",
            birthday:"",
            reason:"",
            type:"",
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
                case 0: type += "SURGERY"; break;
                case 1: type += "REGULAR"; break;
                case 2: type += "VACCINE"; break;
            }
        }
        return type
    }

    useEffect(async () => {
        console.log("onMounted", id, state.type)
        setAptData({
            ref: "C3221982",
            firstName: "Yaocong",
            lastName: "Huang",
            doctor: "Dr.Jane",
            time: "23-03-2024 15:15",
            birthday:"02-01-2002",
            reason:"My leg always pain during rain",
        })
    }, []);
    return (
        <div></div>
    )
}

export default Pending
