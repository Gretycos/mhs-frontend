/**
 * author: Tsong
 * time: 08/05/2024 15:49
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/drug'
export const getDrugs = (params) => {
    return axios.get(PREFIX + '/getDrugs', {params})
}