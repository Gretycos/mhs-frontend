/**
 * author: Tsong
 * time: 16/03/2024 19:41
 */
import "./FootBar.less"
import {Divider, Layout} from "antd";
const {Footer} = Layout

const FootBar = () => {

    return (
        <Footer className="foot-bar">
            <Divider/>
            Copyright © 2024 Hanyu Li, Yu-chu Lai, Yaocong Huang. All rights reserved.
        </Footer>
    )
}

export default FootBar
