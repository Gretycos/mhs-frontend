/**
 * author: Tsong
 * time: 25/04/2024 01:12
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/doctorAppoint'

export const getMyDoctorAppointment = (params) => {
    return axios.get(PREFIX + `/`, {params})
}
