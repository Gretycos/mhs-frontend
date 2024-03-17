/**
 * author: Tsong
 * time: 16/03/2024 16:19
 */
import axios from 'axios'
import {store} from "@/redux/store.js";
import {message} from "antd";

// console.log('import.meta.env', import.meta.env)

axios.defaults.baseURL = import.meta.env.MODE === 'development' ? '/api' : '/api'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = store.getState()?.globalSlice.token
axios.defaults.headers['user-id'] = store.getState()?.globalSlice.userId
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        message.error('server error', 2)
        return Promise.reject(res)
    }
    if (res.data.resultCode !== 200) {
        message.error(res.data.message, 2)
        if (res.data.resultCode === 416) {
            window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }

    return res.data
}, rej => {
    if (rej.response.status === 401){
        message.error("timeout", 2)
    }
    console.log(rej.response)
    return Promise.reject(rej.response.statusText)
})


export default axios
