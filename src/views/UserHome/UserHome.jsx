/**
 * author: Tsong
 * time: 18/03/2024 14:41
 */
import "./UserHome.less"
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    ArrowBack,
    Assignment,
    CalendarMonth,
    EditCalendar,
    FactCheck,
    MedicalInformation,
    Summarize
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Col, Row} from "antd";
import RecentCard from "@/component/RecentCard/RecentCard.jsx";

const UserHome = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [isHomepage, setIsHomepage] = useState(true)

    useEffect(() => {
        // console.log(location)
        if (location.pathname === "/patient") {
            setIsHomepage(true)
        }else{
            setIsHomepage(false)
        }
    }, [location.pathname]);

    const menu = [
        {
            name: "Book Appointment",
            icon: <EditCalendar className="menu-icon-style" />,
            url: "book-appointment"

        },
        {
            name: "Book Test",
            icon: <CalendarMonth className="menu-icon-style" />,
            url: "book-test"

        },
        {
            name: "My Appointment",
            icon: <FactCheck className="menu-icon-style" />,
            url: "my-appointment"

        },
        {
            name: "Test Report",
            icon: <Summarize className="menu-icon-style" />,
            url: "test-report"

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
    ]
    const onItemClick = (idx, url) => {
        navigate(url, {state:{title: menu[idx].name}})
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
                                    <RecentCard type={0}/>
                                </Col>
                                <Col span={12}>
                                    <RecentCard type={1}/>
                                </Col>
                            </Row>
                        </div>
                    )
                    :
                    null
            }
            {
                isHomepage ?
                    (
                        <div className="user-home-menu">
                            {menuComponent}
                        </div>
                    )
                    :
                    null
            }
            <Outlet/>
        </div>
    )
}

export default UserHome
