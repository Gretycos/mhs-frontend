/**
 * author: Tsong
 * time: 16/03/2024 19:37
 */
import "./Completed.less"
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserFramework from "@/component/UserFramework/UserFramework.jsx";

const Completed = () => {
    const location = useLocation();
    const params = useParams()

    const {pathname, state} = location

    const selectors = [
        {
            title: "Date Range",
            key: "dateRange", // 当作后续发请求的参数变量名
            options: null,
        },
    ]

    const getData = (params) => {
        console.log("sending request:", params)
        return {
            code: 200,
            msg: "ok",
            data: {
                page: 1,
                totalSize: 100,
                data: [
                    {
                        id: '00000000',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000001',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000002',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                    {
                        id: '00000003',
                        time: "dd-MM-yyyy HH:mm",
                        title:"John Smith"
                    },
                ],
            }
        }
    }

    return (
        <UserFramework
            state={state}
            pathname={pathname}
            params={params}
            selectors={selectors}
            getData={getData}
            Detail={CompletedAppointmentDetail}
        />
    )
}

const CompletedAppointmentDetail = (props) => {
    const {params, state} = props
    const {id} = params
    const [aptData, setAptData] = useState(
        {
            ref: "",
            firstName: "",
            lastName: "",
            doctor: "",
            time: "",
            birthday:"",
            reason:"",
            type:"",
        }
    )

    const parseType = (first, second) => {
        let type = ""
        if (first === "clinic"){
            type += "CLINIC - "
            switch (second) {
                case 0: type += "FACE-TO-FACE"; break;
                case 1: type += "TELEPHONE"; break;
            }
        } else {
            type += "TEST - "
            switch (second) {
                case 0: type += "SURGERY"; break;
                case 1: type += "REGULAR"; break;
                case 2: type += "VACCINE"; break;
            }
        }
        return type
    }

    useEffect(async () => {
        console.log("onMounted", id, state.type)
        setAptData({
            ref: "C3221982",
            firstName: "Yaocong",
            lastName: "Huang",
            doctor: "Dr.Jane",
            time: "23-03-2024 15:15",
            birthday:"02-01-2002",
            reason:"My leg always pain during rain",
        })
    }, []);
    return (
        <div></div>
    )
}

export default Completed
