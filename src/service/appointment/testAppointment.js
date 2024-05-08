/**
 * author: Tsong
 * time: 25/04/2024 01:52
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/testAppoint'
export const getMyTestAppointment = (params) => {
    return axios.get(PREFIX + `/`, {params})
}

export const countTestAppointTime = (params) => {
    return axios.get(PREFIX + '/countAppointment', {params})
}
