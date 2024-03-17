/**
 * author: Tsong
 * time: 16/03/2024 18:15
 */
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {App as MsgApp} from "antd";
import {store} from "@/redux/store.js";

const RouteGuard = (props) => {
    const token = store.getState()?.globalSlice.token
    const {message} = MsgApp.useApp()

    // 防止多重渲染
    useEffect(() => {
        if (!token){
            message.error("please login", 2)
        }
    }, []);

    if (!token) {
        //没有token直接跳转到登录页
        return <Navigate to='/login' replace/>
    }
    return props.children
}

export default RouteGuard
