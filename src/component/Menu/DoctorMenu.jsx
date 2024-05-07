/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./DoctorMenu.less"
import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {Layout} from "antd";
import { Menu } from 'antd';

const DoctorMenu = (props) => {

    const {initial, practRole} = props
    const navigate = useNavigate();
    const location = useLocation();
    const items = [{
        label: 'Timetable',
        key: '/doctor/timetable',
        icon: <CalendarMonthIcon />,
    }]
    if (practRole === 0){
        items.push({
            label: 'Pending Appointment',
            key: '/doctor/pending',
            icon: <EditCalendarIcon />,
        })
    }
    items.push(
        {
            label: 'Ongoing Appointment',
            key: '/doctor/ongoing',
            icon: <EventIcon />,
        },
        {
            label: 'Completed Appointment',
            key: '/doctor/completed',
            icon: <EventAvailableIcon />

        })
    const [current, setCurrent] = useState(location.pathname)


    const onClick = (e) => {

        console.log(e)

        setCurrent(e.key)

        switch (e.key.split("/")[2]) {
            case("timetable"):{
                navigate(e.key, {state:{title: "Timetable", practRole: practRole}})
                break;
            }
            case("pending"):{
                navigate(e.key, {state:{title: "Pending Appointment", practRole: practRole}})
                break;
            }
            case("ongoing"):{
                navigate(e.key, {state:{title: "Ongoing Appointment", practRole: practRole}})
                break;
            }
            case("completed"):{
                navigate(e.key, {state:{title: "Completed Appointment", practRole: practRole}})
                break;
            }
            default:{
                break;
            }
        }

    };



    return (
        <>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                className="doctor-menu-container"/>
        </>
    )
}

export default DoctorMenu
