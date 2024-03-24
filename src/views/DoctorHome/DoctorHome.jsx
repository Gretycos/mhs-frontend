/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./DoctorHome.less"
import {useNavigate} from "react-router-dom";
import CountUp from 'react-countup';
import { Statistic } from 'antd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
const DoctorHome = () => {
    const navigate = useNavigate()

    const formatter = (value) => <CountUp end={value} separator="," />;

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
                <Statistic title="Pending Request" value={15} formatter={formatter} className="countup-value-style" />
                <Statistic title="Ongoing Request" value={50} formatter={formatter} className="countup-value-style"/>
            </div>
            <div className="doctor-home-menu">
                {menuComponent}
            </div>
        </>
    )
}

export default DoctorHome
