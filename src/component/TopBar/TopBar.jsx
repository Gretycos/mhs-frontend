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
const TopBar = () => {
    const navigate = useNavigate()
    const token = store.getState()?.globalSlice.token

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

    const onLogin = (e) => {
        // console.log(e.key)
        // console.log(typeof e.key)
        if (e.key === "0") {
            navigate("/login/patient")
        }else{
            navigate("/login/doctor")
        }
    }

    // const LoginComponent = () => {
    //
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

    //     const token = store.getState()?.globalSlice.token
    //     return token ? loggedIn(token) : notLoggedIn()
    //
    // }

    const loggedIn = () => {
        // TODO: 用token找用户信息
        const {data} =
        return (
          <div className="top-bar-user-info">
              <UserOutlined/>
              user information
          </div>
        )
    }

    const notLoggedIn = () => {
        return (
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

    return (
        <Header className="top-bar">
            <div className="top-bar-logo">MHS</div>
            <div className="top-bar-right">
                {/*<Search className="top-bar-search" placeholder="input search text" onSearch={onSearch} enterButton/>*/}
                <div className="top-bar-user">
                    {
                        token ?
                            (
                                loggedIn()
                            )
                            :
                            (
                                notLoggedIn()
                            )
                    }
                </div>
            </div>
        </Header>
    )
}

export default TopBar
