/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./TopBar.less"
import {Layout, Input, Button, Dropdown} from "antd";
import {store} from "@/redux/store.js";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
const {Header} = Layout
const {Search} = Input
const TopBar = () => {
    const navigate = useNavigate()
    const token = store.getState()?.globalSlice.token

    const onSearch = () => {

    }

    const dropdownItems = [
        {
            key: '0',
            label: (
                <div className="top-bar-login-dropdown">
                    Customer Login
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

    const onLogin = (e) => {
        // console.log(e.key)
        // console.log(typeof e.key)
        if (e.key === "0") {
            navigate("/login")
        }else{
            navigate("/login", {
                state:{
                    role: 1
                }
            })
        }
    }

    // const LoginComponent = () => {
    //     const loggedIn = (token) => {
    //         // TODO: 用token找用户信息
    //
    //         return (
    //             <div className="top-bar-user">
    //                 User Info
    //             </div>
    //         )
    //     }
    //
    //     const onLogin = (e) => {
    //         console.log(e.key)
    //         if (e.key === "0") {
    //             navigate("/login")
    //         }else{
    //             navigate("/login", {
    //                 state:{
    //                     role: 1
    //                 }
    //             })
    //         }
    //     }
    //     const notLoggedIn = () => {
    //         return (
    //             <div className="top-bar-user">
    //                 <UserOutlined />
    //                 <Dropdown
    //                     menu={{
    //                         items: dropdownItems,
    //                         onClick: onLogin
    //                     }}
    //                     placement="bottom"
    //                 >
    //                     <Button className="top-bar-user" onClick={(e) => onLogin(e)}>Login</Button>
    //                 </Dropdown>
    //             </div>
    //         )
    //     }
    //     const token = store.getState()?.globalSlice.token
    //     return token ? loggedIn(token) : notLoggedIn()
    //
    // }

    return (
        <Header className="top-bar">
            <div className="top-bar-logo">MHS</div>
            <div className="top-bar-right">
                <Search className="top-bar-search" placeholder="input search text" onSearch={onSearch} enterButton/>
                <div className="top-bar-user">
                    {
                        token ?
                            (
                                <div className="top-bar-user-info">
                                    <UserOutlined/>
                                    user information
                                </div>
                            )
                            :
                            (
                                <Dropdown
                                    menu={
                                        {
                                            items: dropdownItems,
                                            onClick: onLogin,
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
