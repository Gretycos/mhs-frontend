/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./DoctorMenu.less"
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Menu } from 'antd';

const DoctorMenu = () => {
    const items = [
        {
            label: (
                <a href="/doctor-timetable">
                    Timetable
                </a>
            ),
            key: 'timetable',
            icon: <CalendarMonthIcon />,
        },
        {
            label: (
                <a href="/doctor-pending">
                    Pending Request
                </a>
            ),
            key: 'pending',
            icon: <EditCalendarIcon />,
        },
        {
            label: (
                <a href="/doctor-ongoing">
                    Ongoing Request
                </a>
            ),
            key: 'ongoing',
            icon: <EventIcon />,
        },
        {
            label: (
                <a href="/doctor-completed">
                    Completed Request
                </a>
            ),
            key: 'completed',
            icon: <EventAvailableIcon />

        },
    ];

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </>
    )
}

export default DoctorMenu
