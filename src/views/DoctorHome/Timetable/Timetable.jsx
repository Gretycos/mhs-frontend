/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Timetable.less"
import { useState, useRef, useEffect } from "react";
import { DayPilotCalendar, DayPilotNavigator } from "daypilot-pro-react";
import {ArrowBack} from "@mui/icons-material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getPractRole} from "@/service/user/practitioner.js";

import moment from "moment";
import {getTimetable} from "@/service/appointment/doctorAppointment.js";
import {getTestTimetable} from "@/service/appointment/testAppointment.js";

const Timetable = (props) => {
    let date = new Date();
    var id = 0;
    const currentDate = date.toISOString().split('T')[0];
    const location = useLocation();
    const params = useParams()

    const {pathname, state, } = location
    const practRole = state.practRole
    // console.log(practRole)
    const navigate = useNavigate();

    var events = []


    const [calendarConfig, setCalendarConfig] = useState({
        viewType: "Week",
        cellHeight: 40,
        cellDuration: 15,
        hourWidth: 120,
        headerHeight: 60,
        timeHeaderCellDuration: 30,
        dayBeginsHour: 8,
        dayEndsHour: 19,

        durationBarVisible: false,
        theme:"mhs-calender-style",
        onBeforeHeaderRender: args => {
            args.header.html = args.column.start.toString("dd-MM-yyyy");
        },
    })

    const calendarRef = useRef();

    const handleTimeRangeSelected = args => {
        calendarRef.current.control.update({
            startDate: args.day
        });
        timetableInitial(moment(args.day.value).startOf('week').format("DD-MM-yyyy"), moment(args.day.value).day(6).format("DD-MM-yyyy"))
    }

    useEffect(() => {
        const startDate = currentDate;
        calendarRef.current.control.update({startDate, events});

        timetableInitial(moment().startOf('week').format("DD-MM-yyyy"), moment(date).day(6).format("DD-MM-yyyy"))


        if (state === null){
            if (pathname.split('/')[1] === "patient"){
                navigate("/patient")
            }else{
                navigate("/doctor")
            }
        }



        calendarRef.current.control.update({startDate, events});
    }, []);

    const timetableInitial  = async (start, end) => {
        // console.log(start, end)
        const params = {
            startDate:start,
            endDate: end
        }
        // console.log(practRole)
        const {data} = practRole === 0 ? await getTimetable(params) : await getTestTimetable(params)
        // console.log(data)
        var dataList = []
        data.map(item=>{
            dataList.push({
                id: id,
                text:item.text,
                start: item.startTime,
                end: item.endTime,
                backColor: item.color,
                clickDisabled: true,
                resizeDisabled: true,
                moveDisabled: true,
                rightClickDisabled: true,
                doubleClickDisabled: true,
                bubbleHtml: item.bubbleHtml,
            })
            id = id + 1;
        })

        calendarRef.current.control.update({
            events:dataList});
    }

    return (
        <>
            <div className="timetable-framework-container">
                <div className="timetable-framework-title">
                    {state ? state.title : ""}
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
