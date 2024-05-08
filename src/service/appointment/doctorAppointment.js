/**
 * author: Tsong
 * time: 25/04/2024 01:12
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/doctorAppoint'

export const getMyDoctorAppointment = (params) => {
    return axios.get(PREFIX + `/`, {params})
}

export const countDoctorAppointTime = () => {
    return axios.get(PREFIX + '/countAppointment')
}

export const getTimetable = (params) => {
    return axios.get(PREFIX + `/getTimetable`, {params})
}
