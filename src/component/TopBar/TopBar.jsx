/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./TopBar.less"
import {Layout, Input} from "antd";
const {Header} = Layout
const {Search} = Input
const TopBar = () => {
    const onSearch = () => {

    }
    return (
        <Header className="top-bar">
            <div className="top-bar-logo">MHS</div>
            <div className="top-bar-right">
                <Search className="top-bar-search" placeholder="input search text" onSearch={onSearch} enterButton />
                <div className="top-bar-user">
                    Login
                </div>
            </div>
        </Header>
    )
}

export default TopBar
