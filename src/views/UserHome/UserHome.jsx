/**
 * author: Tsong
 * time: 18/03/2024 14:41
 */
import "./UserHome.less"
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Assignment, CalendarMonth, EditCalendar, FactCheck, MedicalInformation, Summarize} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Col, Row} from "antd";
import RecentCard from "@/component/RecentCard/RecentCard.jsx";

const UserHome = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [isHomepage, setIsHomepage] = useState(true)
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        if (location.pathname === "/user") {
            setIsHomepage(true)
            setSelected(-1)
        }
    }, [location.pathname]);

    const menu = [
        {
            name: "Book Appointment",
            icon: <EditCalendar className="menu-icon-style" />,
            url: "book-appointment"

        },
        {
            name: "My Appointment",
            icon: <FactCheck className="menu-icon-style" />,
            url: "my-appointment"

        },
        {
            name: "Medical History",
            icon: <MedicalInformation className="menu-icon-style" />,
            url: "medical-history"

        },
        {
            name: "Prescription History",
            icon: <Assignment className="menu-icon-style" />,
            url: "prescription-history"

        },
        {
            name: "Book Test",
            icon: <CalendarMonth className="menu-icon-style" />,
            url: "book-test"

        },
        {
            name: "Test Report",
            icon: <Summarize className="menu-icon-style" />,
            url: "test-report"

        },
    ]
    const onItemClick = (idx, url) => {
        navigate(url)
        setIsHomepage(false)
        setSelected(idx)
    }
    const menuComponent = menu.map((item, idx) => {
        return (
            <div key={idx} className="menu-item" onClick={() => onItemClick(idx, item.url)}>
                <div className="menu-icon">{item.icon}</div>
                <div className="menu-name">{item.name}</div>
            </div>
        )
    })

    const menuComponentSm = menu.map((item, idx) => {
        return (
            <div key={idx} className="menu-item" onClick={() => onItemClick(idx, item.url)}>
                <div className={idx === selected? "menu-icon-selected":"menu-icon"}>{item.icon}</div>
            </div>
        )
    })

    return (
        <div className="user-home">
            {
                isHomepage ?
                    (
                        <div className="user-home-recent">
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
                                    <RecentCard kind={0}/>
                                </Col>
                                <Col span={12}>
                                    <RecentCard kind={1}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    :
                    null
            }
            <div className={isHomepage? "user-home-menu" : "user-home-menu-sm"}>
                {isHomepage ? menuComponent : menuComponentSm}
            </div>
            <Outlet/>
        </div>
    )
}

export default UserHome
