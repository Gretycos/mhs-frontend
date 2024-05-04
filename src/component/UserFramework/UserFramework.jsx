/**
 * author: Tsong
 * time: 23/03/2024 17:02
 */
import "./UserFramework.less"
import {ArrowBack} from "@mui/icons-material";
import DataList from "@/component/DataList/DataList.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const UserFramework = (props) => {
    const {pathname, state, params, selectors, getData, Detail} = props
    const hasNoParams = Object.keys(params).length === 0
    const navigate = useNavigate();
    // console.log(state)
    // console.log(pathname.split('/'))
    useEffect(() => {
        if (state === null){
            if (pathname.split('/')[1] === "patient"){
                navigate("/patient")
            }else{
                navigate("/doctor")
            }
        }
    }, []);

    return (
        <div className="user-framework-container">
            <div className="user-framework-title">
                {state ? state.title : ""}
            </div>
            {pathname.split('/')[1] === "patient" ? <ArrowBack className="back-icon" onClick={() => navigate(-1)}/> : null}
            {
                hasNoParams ?
                    <DataList
                        selectors={selectors}
                        getData={getData}
                        path={pathname}
                        state={state}
                    />
                    :
                    <Detail
                        state={state}
                        params={params}
                    />
            }
        </div>
    )
}
export default UserFramework
