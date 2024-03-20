/**
 * author: Tsong
 * time: 19/03/2024 15:54
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/user'

export const login = (params) => {
    return axios.post(PREFIX + '/login', params)
}

export const logout = () => {
    return axios.delete(PREFIX + '/logout')
}

export const register = (params) => {
    return axios.post(PREFIX + '/register', params)
}
