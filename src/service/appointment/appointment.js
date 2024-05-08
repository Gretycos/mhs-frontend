/**
 * author: Tsong
 * time: 25/04/2024 01:10
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/appoint'
export const getMyAppointments = (params) => {
    return axios.get(PREFIX + '/myList', {params})
}

export const getMyRecentAppointments = (params) => {
    return axios.get(PREFIX + '/myList/recent', {params})
}
