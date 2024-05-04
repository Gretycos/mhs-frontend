/**
 * author: Tsong
 * time: 19/03/2024 15:54
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/patient'

export const login = (params) => {
    return axios.post(PREFIX + '/login', params)
}

export const logout = () => {
    return axios.delete(PREFIX + '/logout')
}

export const register = (params) => {
    return axios.post(PREFIX + '/register', params)
}

export const forgot = (params) => {
    return axios.post(PREFIX + '/forgot', params)
}

export const reset = (params) => {
    return axios.post(PREFIX + '/reset', params)
}

export const validateReset = (token) => {
    return axios.get(PREFIX + `/validateReset/${token}`)
}

export const getPatientInfo = (params) => {
    return axios.get(PREFIX + '/info', {params})
}

export const updatePatientInfo = (params) => {
    return axios.put(PREFIX + '/info/update', params)
}
