/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./TopBar.less"
import {Layout, Button, Dropdown} from "antd";
import {store} from "@/redux/store.js";
import {UserOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {getPatientInfo, logout} from "@/service/user/patient.js";
import {useEffect, useState} from "react";
import {getPractitionerInfo, logoutPract} from "@/service/user/practitioner.js";
import {save} from "@/redux/slice/globalSlice.js";
import {useDispatch} from "react-redux";
const {Header} = Layout
const TopBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = store.getState()?.globalSlice.token
    const [fullName, setFullName] = useState("full name")
    const location = useLocation()

    const isHome = location.pathname.split("/")[1] === "home"
    // console.log("isHome?", isHome)

    useEffect( () => {
        if (token) {
            getUserInfo()
        }
    }, []);

    const getUserInfo = async () => {
        // const userId = store.getState()?.globalSlice.userId
        const role = store.getState()?.globalSlice.role
        const {data} = role === "patient" ? await getPatientInfo() : await getPractitionerInfo(params)
        const name = `${data.givenName} ${data.familyName}`
        setFullName(name)
    }

    const dropdownItems = [
        {
            key: '0',
            label: (
                <div className="top-bar-login-dropdown">
                    Patient Login
                </div>
            ),
        },
        {
            key: '1',
            label: (
                <div className="top-bar-login-dropdown">
                    Doctor Login
                </div>
            ),
        },
    ]

    const dropdownItemsLoggedIn = [
        {
            key: '0',
            label: (
                <div className="top-bar-login-dropdown">
                    User Info
                </div>
            ),
        },
        {
            key: '1',
            label: (
                <div className="top-bar-login-dropdown">
                    Sign out
                </div>
            ),
        },
    ]

    const onClickNotLoggedIn = (e) => {
        // console.log(e.key)
        // console.log(typeof e.key)
        if (e.key === "0") {
            navigate("/login/patient")
        }else{
            navigate("/login/doctor")
        }
    }

    const onClickLoggedIn = (e) => {
        // console.log(e.key)
        // console.log(typeof e.key)
        if (e.key === "0") {
            // info
            navigate("/patient/info")
        }else{
            // sign out
            const role = store.getState()?.globalSlice.role
            const params = {
                token: store.getState()?.globalSlice.token
            }
            role === "patient" ? logout(params) : logoutPract(params)
            dispatch(save({ userId: '' }))
            dispatch(save({ token: '' }))
            dispatch(save({ role: '' }))
            navigate("/")
        }
    }

    const toSpecificHome = () => {
        if (store.getState()?.globalSlice.role === "patient") {
            return (
                <div className="top-bar-nav" onClick={() => navigate("/patient")}>
                    <span className="top-bar-nav-item">To Patient Home</span>
                </div>
            )
        }
        return (
            <div className="top-bar-nav" onClick={() => navigate("/doctor")}>
                <span className="top-bar-nav-item">To Doctor Home</span>
            </div>
        )
    }

    return (
        <Header className="top-bar">
            <div className="top-bar-logo" onClick={() => navigate("/home")}>MHS</div>
            <div className="top-bar-right">
                {/*<Search className="top-bar-search" placeholder="input search text" onSearch={onSearch} enterButton/>*/}
                {
                    token && isHome?
                        toSpecificHome()
                        :
                        null
                }
                <div className="top-bar-user">
                    {
                        token ?
                            (
                                <Dropdown
                                    menu={
                                        {
                                            items: dropdownItemsLoggedIn,
                                            onClick: onClickLoggedIn,
                                        }
                                    }
                                    placement="bottom"
                                >
                                    <div className="top-bar-user-info">
                                        <UserOutlined/>
                                        <span>{fullName}</span>
                                    </div>
                                </Dropdown>
                            )
                            :
                            (
                                <Dropdown
                                    menu={
                                        {
                                            items: dropdownItems,
                                            onClick: onClickNotLoggedIn,
                                        }
                                    }
                                    placement="bottom"
                                >
                                    <Button className="top-bar-user" disabled>Login</Button>
                                </Dropdown>
                            )
                    }
                </div>
            </div>
        </Header>
    )
}

export default TopBar
