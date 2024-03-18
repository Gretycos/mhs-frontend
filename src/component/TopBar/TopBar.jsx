/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./TopBar.less"
import {Layout, Input, Button, Dropdown} from "antd";
import {store} from "@/redux/store.js";
import {UserOutlined} from "@ant-design/icons";
const {Header} = Layout
const {Search} = Input
const TopBar = () => {
    const onSearch = () => {

    }

    const dropdownItems = [
        {
            key: '0',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    User Login
                </a>
            ),
        },
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Doctor Login
                </a>
            ),
        },
    ]

    const LoginComponent = () => {
        const loggedIn = (token) => {
            // TODO: 用token找用户信息

            return (
                <div className="top-bar-user">
                    User Info
                </div>
            )
        }
        const notLoggedIn = () => {
            return (
                <div className="top-bar-user">
                    <UserOutlined />
                    <Dropdown
                        menu={{
                            items: dropdownItems,
                        }}
                        placement="bottom"
                    >
                        <Button className="top-bar-user">Login</Button>
                    </Dropdown>
                </div>
            )
        }
        const token = store.getState()?.globalSlice.token
        return token ? loggedIn(token) : notLoggedIn()

        // if (token) {
        //     // TODO: 用token找用户信息
        //     return (
        //         <div className="top-bar-user">
        //             User Info
        //         </div>
        //     )
        // }
        // return (
        //     <div className="top-bar-user">
        //         <UserOutlined />
        //         <Dropdown
        //             menu={{
        //                 items: dropdownItems,
        //             }}
        //             placement="bottom"
        //         >
        //             <Button className="top-bar-user">Login</Button>
        //         </Dropdown>
        //     </div>
        // )
    }

    return (
        <Header className="top-bar">
            <div className="top-bar-logo">MHS</div>
            <div className="top-bar-right">
                <Search className="top-bar-search" placeholder="input search text" onSearch={onSearch} enterButton />
                <LoginComponent />
            </div>
        </Header>
    )
}

export default TopBar
