/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Timetable.less"
import dayjs from 'dayjs';
import {Alert, Badge, Calendar, Select, Typography} from 'antd';
import { useState, useRef, useEffect } from "react";
import DoctorMenu from "@/component/Menu/DoctorMenu.jsx";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";


const Timetable = () => {
    let date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    const [calendarConfig, setCalendarConfig] = useState({
        viewType: "Week",
        durationBarVisible: false,
    })

    const calendarRef = useRef();

    const handleTimeRangeSelected = args => {
        calendarRef.current.control.update({
            startDate: args.day
        });
    }

    useEffect(() => {
        const events = [
            {
                id: 1,
                text: "Busy",
                start: "2024-03-19T09:00:00",
                end: "2024-03-19T09:15:00",
                backColor: "#cc4125",
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 2,
                text: "Spare",
                start: "2024-03-19T09:15:00",
                end: "2024-03-19T09:30:00",
                backColor: "#f1c232",
            },
            {
                id: 3,
                text: "Busy",
                start: "2024-03-19T09:30:00",
                end: "2024-03-19T09:45:00",
                backColor: "#cc4125",
            },
            {
                id: 4,
                text: "Busy",
                start: "2024-03-19T09:45:00",
                end: "2024-03-19T10:00:00",
                backColor: "#cc4125",
            },
            {
                id: 5,
                text: "Busy",
                start: "2024-03-19T10:00:00",
                end: "2024-03-19T10:15:00",
                backColor: "#cc4125",
            },
            {
                id: 6,
                text: "Busy",
                start: "2024-03-19T10:15:00",
                end: "2024-03-19T10:30:00",
                backColor: "#cc4125",
            },
            {
                id: 7,
                text: "Busy",
                start: "2024-03-19T10:30:00",
                end: "2024-03-19T10:45:00",
                backColor: "#cc4125",
            },
            {
                id: 8,
                text: "Busy",
                start: "2024-03-19T10:45:00",
                end: "2024-03-19T11:00:00",
                backColor: "#cc4125",
            },
            {
                id: 9,
                text: "Busy",
                start: "2024-03-19T11:00:00",
                end: "2024-03-19T11:15:00",
                backColor: "#cc4125",
            },
            {
                id: 10,
                text: "Busy",
                start: "2024-03-19T11:15:00",
                end: "2024-03-19T11:30:00",
                backColor: "#cc4125",
            },
            {
                id: 11,
                text: "Busy",
                start: "2024-03-19T11:30:00",
                end: "2024-03-19T11:45:00",
                backColor: "#cc4125",
            },
            {
                id: 12,
                text: "Busy",
                start: "2024-03-19T11:45:00",
                end: "2024-03-19T12:00:00",
                backColor: "#cc4125",
            },
            {
                id: 13,
                text: "Free",
                start: "2024-03-19T13:00:00",
                end: "2024-03-19T13:15:00",
                backColor: "#6aa84f",
            },
            {
                id: 14,
                text: "Free",
                start: "2024-03-19T13:15:00",
                end: "2024-03-19T13:30:00",
                backColor: "#6aa84f",
            },
            {
                id: 15,
                text: "Free",
                start: "2024-03-19T13:30:00",
                end: "2024-03-19T13:45:00",
                backColor: "#6aa84f",
            },
            {
                id: 16,
                text: "Free",
                start: "2024-03-19T13:45:00",
                end: "2024-03-19T14:00:00",
                backColor: "#6aa84f",
            },
            {
                id: 17,
                text: "Free",
                start: "2024-03-19T14:00:00",
                end: "2024-03-19T14:15:00",
                backColor: "#6aa84f",
            },
            {
                id: 18,
                text: "Free",
                start: "2024-03-19T14:15:00",
                end: "2024-03-19T14:30:00",
                backColor: "#6aa84f",
            },
            {
                id: 19,
                text: "Free",
                start: "2024-03-19T14:30:00",
                end: "2024-03-19T14:45:00",
                backColor: "#6aa84f",
            },
            {
                id: 20,
                text: "Free",
                start: "2024-03-19T14:45:00",
                end: "2024-03-19T15:00:00",
                backColor: "#6aa84f",
            },
            {
                id: 21,
                text: "Free",
                start: "2024-03-19T15:00:00",
                end: "2024-03-19T15:15:00",
                backColor: "#6aa84f",
            },
            {
                id: 22,
                text: "Free",
                start: "2024-03-19T15:15:00",
                end: "2024-03-19T15:30:00",
                backColor: "#6aa84f",
            },
            {
                id: 23,
                text: "Free",
                start: "2024-03-19T15:30:00",
                end: "2024-03-19T15:45:00",
                backColor: "#6aa84f",
            },
            {
                id: 24,
                text: "Free",
                start: "2024-03-19T15:45:00",
                end: "2024-03-19T16:00:00",
                backColor: "#6aa84f",
            },
            {
                id: 25,
                text: "Free",
                start: "2024-03-19T16:00:00",
                end: "2024-03-19T16:15:00",
                backColor: "#6aa84f",
            },
            {
                id: 26,
                text: "Free",
                start: "2024-03-19T16:15:00",
                end: "2024-03-19T16:30:00",
                backColor: "#6aa84f",
            },
            {
                id: 27,
                text: "Free",
                start: "2024-03-19T16:30:00",
                end: "2024-03-19T16:45:00",
                backColor: "#6aa84f",
            },
            {
                id: 28,
                text: "Free",
                start: "2024-03-19T16:45:00",
                end: "2024-03-19T17:00:00",
                backColor: "#6aa84f",
            },
        ];

        const startDate = currentDate;

        calendarRef.current.control.update({startDate, events});
    }, []);

    return (
        <>
            <DoctorMenu/>
            <div className="timetable-container">
                <Typography.Title level={1}>Timetable</Typography.Title>
                <div className="calendar-container">
                    <DayPilotNavigator
                        selectMode={"Week"}
                        showMonths={1}
                        skipMonths={1}
                        startDate={currentDate}
                        onTimeRangeSelected={handleTimeRangeSelected}
                    />
                    <div style={{flexGrow: 1}}>
                        <DayPilotCalendar {...calendarConfig} ref={calendarRef}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timetable
