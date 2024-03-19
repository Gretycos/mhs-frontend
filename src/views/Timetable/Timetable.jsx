/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Timetable.less"
import dayjs from 'dayjs';
import {Alert, Badge, Calendar, Modal, Typography} from 'antd';
import { useState } from "react";
import DoctorMenu from "@/component/Menu/DoctorMenu.jsx";

const Timetable = () => {
    const [value, setValue] = useState(() => dayjs('2024-03-18'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-03-18'));
    const getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    {
                        color: 'red',
                        content: 'Morning',
                    },
                    {
                        color: 'yellow',
                        content: 'Afternoon',
                    },
                ];
                break;
            case 10:
                listData = [
                    {
                        color: 'green',
                        content: 'Morning',
                    },
                    {
                        color: 'red',
                        content: 'Afternoon',
                    },
                ];
                break;
            default:
        }
        return listData || [];
    };

    let listData2 = [
        {
            color: 'red',
            content: '9:00 ~ 9:15',
        },
        {
            color: 'red',
            content: '9:15 ~ 9:30',
        },
        {
            color: 'red',
            content: '9:30 ~ 9:45',
        },
        {
            color: 'red',
            content: '9:45 ~ 10:00',
        },
        {
            color: 'red',
            content: '10:15 ~ 10:30',
        },
        {
            color: 'red',
            content: '10:30 ~ 10:45',
        },
        {
            color: 'red',
            content: '10:45 ~ 11:00',
        },
        {
            color: 'red',
            content: '11:00 ~ 11:15',
        },
        {
            color: 'red',
            content: '11:15 ~ 11:30',
        },
        {
            color: 'red',
            content: '11:30 ~ 11:45',
        },
        {
            color: 'red',
            content: '11:45 ~ 12:00',
        },
        {
            color: 'red',
            content: '13:00 ~ 13:15',
        },
        {
            color: 'red',
            content: '13:15 ~ 13:30',
        },
        {
            color: 'red',
            content: '13:30 ~ 13:45',
        },
        {
            color: 'red',
            content: '13:45 ~ 14:00',
        },
        {
            color: 'red',
            content: '14:00 ~ 14:15',
        },
        {
            color: 'red',
            content: '14:15 ~ 14:30',
        },
        {
            color: 'red',
            content: '14:30 ~ 14:45',
        },
        {
            color: 'red',
            content: '14:45 ~ 15:00',
        },
        {
            color: 'red',
            content: '15:00 ~ 15:15',
        },
        {
            color: 'red',
            content: '15:15 ~ 15:30',
        },
        {
            color: 'red',
            content: '15:30 ~ 15:45',
        },
        {
            color: 'red',
            content: '15:45 ~ 16:00',
        },
        {
            color: 'red',
            content: '16:00 ~ 16:15',
        },
        {
            color: 'red',
            content: '16:15 ~ 16:30',
        },
        {
            color: 'red',
            content: '16:30 ~ 16:45',
        },
        {
            color: 'red',
            content: '16:45 ~ 17:00',
        },
    ]

    const info = (day) => {
        Modal.info({
            title: {day},
            content: (
                <ul className="events">
                    {listData.map((item) => (
                        <li>
                            <Badge color={item.color} text={item.content}/>
                        </li>

                    ))}
                </ul>
            ),
            onOk() {
            },
        });
    };

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li>
                        <Badge color={item.color} text={item.content} />
                    </li>

                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
        info(newValue)
    };
    const onPanelChange = (newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <DoctorMenu />
            <div className="timetable-container">
                <Typography.Title level={10}>Timetable</Typography.Title>
                <Calendar cellRender={cellRender} onSelect={onSelect} onPanelChange={onPanelChange} />
            </div>

        </>
    )
}

export default Timetable
