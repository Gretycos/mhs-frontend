/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./TopBar.less"
import {Layout, Input, Button, Dropdown} from "antd";
import {store} from "@/redux/store.js";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {getPatientInfo, logout} from "@/service/user/patient.js";
import {useEffect, useState} from "react";
import {getPractitionerInfo, logoutPract} from "@/service/user/practitioner.js";
const {Header} = Layout
const TopBar = () => {
    const navigate = useNavigate()
    const token = store.getState()?.globalSlice.token
    const [fullName, setFullName] = useState("full name")

    useEffect( () => {
        if (token) {
            // getUserInfo()
        }
    }, []);

    const getUserInfo = async () => {
        // const userId = store.getState()?.globalSlice.userId
        // const role = store.getState()?.globalSlice.role
        // const params = {
        //     userId: userId
        // }
        // const {data} = role === "patient" ? await getPatientInfo(params) : await getPractitionerInfo(params)
        // const name = `${data.givenName} ${data.familyName}`
        // setFullName(name)
        // console.log(data)
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
            let params = {
                token: store.getState()?.globalSlice.token
            }
            const userId = store.getState()?.globalSlice.userId
            if (role === "patient") {
                params.patientId = userId
                logout(params)
            } else {
                params.practId = userId
                logoutPract(params)
            }
            navigate("/")
        }
    }

    return (
        <Header className="top-bar">
            <div className="top-bar-logo">MHS</div>
            <div className="top-bar-right">
                {/*<Search className="top-bar-search" placeholder="input search text" onSearch={onSearch} enterButton/>*/}
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
