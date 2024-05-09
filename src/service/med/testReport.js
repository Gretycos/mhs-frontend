/**
 * author: Tsong
 * time: 08/05/2024 15:49
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/testReport'
export const getMyTestReports = (params) => {
    return axios.get(PREFIX + '/myList', {params})
}

export const getMyRecentTestReports = (params) => {
    return axios.get(PREFIX + '/myList/recent', {params})
}

export const getMyTestReport = (params) => {
    return axios.get(PREFIX + `/`, {params})
}

export const insertTestReport = (params) => {
    return axios.post(PREFIX + `/addTestReport`, params)
}