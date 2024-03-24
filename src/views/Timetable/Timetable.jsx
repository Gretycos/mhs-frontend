/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Timetable.less"
import { useState, useRef, useEffect } from "react";
import { DayPilotCalendar, DayPilotNavigator } from "daypilot-pro-react";

const Timetable = () => {
    let date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    const [calendarConfig, setCalendarConfig] = useState({
        viewType: "Week",
        cellHeight: 40,
        cellDuration: 15,
        hourWidth: 120,
        headerHeight: 60,
        timeHeaderCellDuration: 30,
        dayBeginsHour: 7,
        dayEndsHour: 19,

        durationBarVisible: false,
        theme:"mhs-calender-style",
        onBeforeHeaderRender: args => {
            args.header.html = args.column.start.toString("MM-dd-yyyy");
        },
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
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "Testing bubble HTML"
            },
            {
                id: 2,
                text: "Spare",
                start: "2024-03-19T09:15:00",
                end: "2024-03-19T09:30:00",
                backColor: "#f1c232",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 3,
                text: "Busy",
                start: "2024-03-19T09:30:00",
                end: "2024-03-19T09:45:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 4,
                text: "Busy",
                start: "2024-03-19T09:45:00",
                end: "2024-03-19T10:00:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 5,
                text: "Busy",
                start: "2024-03-19T10:00:00",
                end: "2024-03-19T10:15:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 6,
                text: "Busy",
                start: "2024-03-19T10:15:00",
                end: "2024-03-19T10:30:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 7,
                text: "Busy",
                start: "2024-03-19T10:30:00",
                end: "2024-03-19T10:45:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 8,
                text: "Busy",
                start: "2024-03-19T10:45:00",
                end: "2024-03-19T11:00:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 9,
                text: "Busy",
                start: "2024-03-19T11:00:00",
                end: "2024-03-19T11:15:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 10,
                text: "Busy",
                start: "2024-03-19T11:15:00",
                end: "2024-03-19T11:30:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 11,
                text: "Busy",
                start: "2024-03-19T11:30:00",
                end: "2024-03-19T11:45:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 12,
                text: "Busy",
                start: "2024-03-19T11:45:00",
                end: "2024-03-19T12:00:00",
                backColor: "#cc4125",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 13,
                text: "Free",
                start: "2024-03-19T13:00:00",
                end: "2024-03-19T13:15:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 14,
                text: "Free",
                start: "2024-03-19T13:15:00",
                end: "2024-03-19T13:30:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 15,
                text: "Free",
                start: "2024-03-19T13:30:00",
                end: "2024-03-19T13:45:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 16,
                text: "Free",
                start: "2024-03-19T13:45:00",
                end: "2024-03-19T14:00:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 17,
                text: "Free",
                start: "2024-03-19T14:00:00",
                end: "2024-03-19T14:15:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 18,
                text: "Free",
                start: "2024-03-19T14:15:00",
                end: "2024-03-19T14:30:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 19,
                text: "Free",
                start: "2024-03-19T14:30:00",
                end: "2024-03-19T14:45:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 20,
                text: "Free",
                start: "2024-03-19T14:45:00",
                end: "2024-03-19T15:00:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 21,
                text: "Free",
                start: "2024-03-19T15:00:00",
                end: "2024-03-19T15:15:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 22,
                text: "Free",
                start: "2024-03-19T15:15:00",
                end: "2024-03-19T15:30:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 23,
                text: "Free",
                start: "2024-03-19T15:30:00",
                end: "2024-03-19T15:45:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 24,
                text: "Free",
                start: "2024-03-19T15:45:00",
                end: "2024-03-19T16:00:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 25,
                text: "Free",
                start: "2024-03-19T16:00:00",
                end: "2024-03-19T16:15:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 26,
                text: "Free",
                start: "2024-03-19T16:15:00",
                end: "2024-03-19T16:30:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 27,
                text: "Free",
                start: "2024-03-19T16:30:00",
                end: "2024-03-19T16:45:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
            {
                id: 28,
                text: "Free",
                start: "2024-03-19T16:45:00",
                end: "2024-03-19T17:00:00",
                backColor: "#6aa84f",
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: "09:00 ~ 09:15",
            },
        ];

        const startDate = currentDate;

        calendarRef.current.control.update({startDate, events});
    }, []);

    return (
        <>
            <div className="timetable-page-container">
                <div className="timetable-head-container">
                    <p className="timetable-head-font">Timetable</p>
                    <div className="timetable-head-line"/>
                </div>
                <div className="timetable-container">
                    <div className="timetable-navigator-container">
                        <DayPilotNavigator
                            theme={"mhs-navigate-style"}
                            selectMode={"Week"}
                            showMonths={1}
                            skipMonths={1}
                            startDate={currentDate}
                            onTimeRangeSelected={handleTimeRangeSelected}
                        />
                    </div>
                    <div className="timetable-calendar-container">
                        <DayPilotCalendar {...calendarConfig} ref={calendarRef}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Timetable