/**
 * author: Tsong
 * time: 08/05/2024 15:49
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/prescri'
export const addPrescri = (params) => {
    return axios.post(PREFIX + '/addPrescri', params)
}