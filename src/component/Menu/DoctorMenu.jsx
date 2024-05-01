/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./DoctorMenu.less"
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {Layout} from "antd";
import { Menu } from 'antd';

const DoctorMenu = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            label: 'Timetable',
            key: '/doctor/timetable',
            icon: <CalendarMonthIcon />,
        },
        {
            label: 'Pending Request',
            key: '/doctor/pending',
            icon: <EditCalendarIcon />,
        },
        {
            label: 'Ongoing Request',
            key: '/doctor/ongoing',
            icon: <EventIcon />,
        },
        {
            label: 'Completed Request',
            key: 'completed',
            icon: <EventAvailableIcon />

        },
    ];

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        setCurrent(e.key)
        navigate(e.key);
    };



    return (
        <>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}/>
        </>
    )
}

export default DoctorMenu
