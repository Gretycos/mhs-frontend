/**
 * author: Tsong
 * time: 18/03/2024 14:41
 */
import "./UserHome.less"
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import {useNavigate} from "react-router-dom";
import {Assignment, CalendarMonth, EditCalendar, FactCheck, MedicalInformation, Summarize} from "@mui/icons-material";

const UserHome = () => {
    const navigate = useNavigate()

    const menu = [
        {
            name: "Book Appointment",
            icon: <EditCalendar className="menu-icon-style" />,
            url: ""

        },
        {
            name: "My Appointment",
            icon: <FactCheck className="menu-icon-style" />,
            url: ""

        },
        {
            name: "Medical History",
            icon: <MedicalInformation className="menu-icon-style" />,
            url: ""

        },
        {
            name: "Prescription History",
            icon: <Assignment className="menu-icon-style" />,
            url: ""

        },
        {
            name: "Book Test",
            icon: <CalendarMonth className="menu-icon-style" />,
            url: ""

        },
        {
            name: "Test Report",
            icon: <Summarize className="menu-icon-style" />,
            url: ""

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
        <div className="user-home-menu">
            {menuComponent}
        </div>
    )
}

export default UserHome
