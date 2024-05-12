import axios from "@/common/js/axios.js";

/**
 * author: Tsong
 * time: 08/05/2024 19:33
 */
const PREFIX = '/medHistory'

export const getMyMedHistories = (params) => {
    return axios.get(PREFIX + '/myList', {params})
}

export const getMyMedHistory = (params) => {
    return axios.get(PREFIX + `/`, {params})
}

export const getAppointMedHistory = (params) => {
    return axios.get(PREFIX + `/getAppointMedHistory`, {params})
}

export const  updateMedHistory = (params) => {
    return axios.put(PREFIX + `/updateMedHistory`, params)
}
