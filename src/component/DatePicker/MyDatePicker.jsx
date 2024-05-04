/**
 * author: Tsong
 * time: 23/03/2024 01:23
 */
import "./MyDatePicker.less"
import dayjs from "dayjs";
import {DatePicker} from "antd";
const { RangePicker } = DatePicker;

const MyDatePicker = (props) => {
    const {title, onChange, options} = props

    let date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    const dateFormat = 'YYYY-MM-DD';
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > dayjs().endOf('day');
    };

    return (
        <div className="datepicker-container">
            <div className="datepicker-title">{title}: </div>
            <RangePicker
                className="datepciker-select-tools"
                onChange={onChange}
                defaultValue={dayjs(currentDate, dateFormat)}
                maxDate={dayjs(currentDate, dateFormat)}
                format={dateFormat}
                size={"large"}
            />
        </div>
    )
}

export default MyDatePicker
