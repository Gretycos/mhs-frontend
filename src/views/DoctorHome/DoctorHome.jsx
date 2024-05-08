/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./DoctorHome.less"
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import CountUp from 'react-countup';
import {Col, Row, Statistic} from 'antd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CountCard from "@/component/CountCard/CountCard.jsx";
import RecentCard from "@/component/RecentCard/RecentCard.jsx";
import {useEffect, useState} from "react";
import DoctorMenu from "@/component/Menu/DoctorMenu.jsx";
import {countDoctorAppointTime} from "@/service/appointment/doctorAppointment.js";
import {countTestAppointTime} from "@/service/appointment/testAppointment.js";
import {getPractRole} from "@/service/user/practitioner.js";
const DoctorHome = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [isHomepage, setIsHomepage] = useState(true)

    const [practRole, setPractRole] = useState(0)


    useEffect(() => {
        // console.log(location)
        if (location.pathname === "/doctor") {
            setIsHomepage(true)
        }else{
            setIsHomepage(false)
        }

        onInitial();
    }, [location.pathname]);

    const onInitial  = async () => {
        const {data} = await getPractRole()
        console.log(data)
        setPractRole(data.role)

    }

    const menu = [
        {
            name: "Timetable",
            icon: <CalendarMonthIcon className="menu-icon-style"/>,
            url: "/doctor/timetable"
        },
    ]

    if (practRole === 0){
        menu.push({
            name: "Pending Appointment",
            icon: <EditCalendarIcon className="menu-icon-style"/>,
            url: "/doctor/pending"
        })
    }

    menu.push({
        name: "Ongoing Appointment",
        icon: <EventIcon className="menu-icon-style"/>,
        url: "/doctor/ongoing"
    },
    {
        name: "Completed Appointment",
        icon: <EventAvailableIcon className="menu-icon-style"/>,
        url: "/doctor/completed"
    })

    const onItemClick = (idx, url) => {
        navigate(url, {state:{title: menu[idx].name, practRole:practRole}})
        setIsHomepage(false)
    }

    const menuComponent = menu.map((item, idx) => {
        return (
            <div key={idx} className="menu-item" onClick={() => onItemClick(idx, item.url)}>
                <div className="menu-icon">{item.icon}</div>
                <div className="menu-name">{item.name}</div>
            </div>
        )
    })

    return (

        <div className="doctor-home">
            {
                isHomepage ?
                    (
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
                                {
                                    practRole === 0 ?
                                        (
                                            <>
                                                <Col span={12}>
                                                    <CountCard key={practRole} type={0} practRole={practRole}/>
                                                </Col>
                                                <Col span={12}>
                                                    <CountCard key={practRole} type={1} practRole={practRole}/>
                                                </Col>
                                            </>

                                        )
                                    :
                                    (
                                        <Col span={24}>
                                            <CountCard key={practRole} type={1} practRole={practRole}/>
                                        </Col>
                                    )
                                }

                            </Row>
                        </div>
                    )
                    :
                    <DoctorMenu practRole={practRole}/>
            }
            {
                isHomepage ?
                    (
                        <div className="doctor-home-menu">
                            {menuComponent}
                        </div>
                    )
                    :
                    null
            }
            <div className="doctor-outlet">
                <Outlet/>
            </div>
        </div>
    )
}

export default DoctorHome
