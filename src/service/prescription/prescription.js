/**
 * author: Tsong
 * time: 08/05/2024 15:49
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/prescri'
export const addPrescri = (params) => {
    return axios.post(PREFIX + '/addPrescri', params)
}

export const getMyPrescriptionList = (params) => {
    return axios.get(PREFIX + '/getList', {params})
}

export const getMyPrescriptionDetail = (params) => {
    return axios.get(PREFIX + '/getPrescriDetail', {params})
}
