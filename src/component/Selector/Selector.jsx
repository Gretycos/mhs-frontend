/**
 * author: Tsong
 * time: 23/03/2024 01:23
 */
import "./Selector.less"
import {Select} from "antd";

const Selector = (props) => {
    const {title, onChange, options} = props
    return (
        <div className="selector-container">
            <div className="selector-title">{title}: </div>
            <Select
                className="selector-main"
                defaultValue={0}
                onChange={onChange}
                options={options}
            />
        </div>
    )
}

export default Selector
