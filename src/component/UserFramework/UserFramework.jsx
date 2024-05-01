/**
 * author: Tsong
 * time: 23/03/2024 17:02
 */
import "./UserFramework.less"
import {ArrowBack} from "@mui/icons-material";
import DataList from "@/component/DataList/DataList.jsx";
import {useNavigate} from "react-router-dom";

const UserFramework = (props) => {
    const {pathname, state, params, selectors, getData, Detail} = props
    const hasNoParams = Object.keys(params).length === 0
    const navigate = useNavigate();
    return (
        <div className="user-framework-container">
            <div className="user-framework-title">
                {state.title}
            </div>
            <ArrowBack className="back-icon" onClick={() => navigate(-1)}/>
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
