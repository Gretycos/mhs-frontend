/**
 * author: Tsong
 * time: 20/03/2024 19:53
 */
import "./RecentCard.less"
import {Card} from "antd";

const RecentCard = (props) => {
    const {kind} = props

    return (
        <Card
            className="recent-card"
            title={kind === 0 ? "Recent Appointment" : "Recent Report"}
            bordered={false}
        >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    )
}

export default RecentCard
