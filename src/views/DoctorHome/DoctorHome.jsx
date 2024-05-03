/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./DoctorHome.less"
import {useNavigate} from "react-router-dom";
import CountUp from 'react-countup';
import {Col, Row, Statistic} from 'antd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CountCard from "@/component/CountCard/CountCard.jsx";
const DoctorHome = () => {
    const navigate = useNavigate()

    const menu = [
        {
            name: "Timetable",
            icon: <CalendarMonthIcon className="menu-icon-style"/>,
            url: "/doctor/timetable"
        },
        {
            name: "Pending Request",
            icon: <EditCalendarIcon className="menu-icon-style"/>,
            url: "/doctor/pending"
        },
        {
            name: "Ongoing Request",
            icon: <EventIcon className="menu-icon-style"/>,
            url: "/doctor/ongoing"
        },
        {
            name: "Completed Request",
            icon: <EventAvailableIcon className="menu-icon-style"/>,
            url: "/doctor/completed"
        },
    ]


    const countPending = 15

    const countOngoing = 50


    const onItemClick = (url) => {
        navigate(url)
    }

    const menuComponent = menu.map((item, idx) => {
        return (
            <div key={idx} className="menu-item" onClick={() => onItemClick(item.url)}>
                <div className="menu-icon">{item.icon}</div>
                <div className="menu-name">{item.name}</div>
            </div>
        )
    })

    return (
        <>
            <div className="doctor-home-countup">
                <Row
                    justify="space-between"
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >
                    <Col span={12}>
                        <CountCard type={0}/>
                    </Col>
                    <Col span={12}>
                        <CountCard type={1}/>
                    </Col>
                </Row>
            </div>
            <div className="doctor-home-menu">
                {menuComponent}
            </div>
        </>
    )
}

export default DoctorHome
