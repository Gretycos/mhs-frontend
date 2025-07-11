/**
 * author: Tsong
 * time: 25/04/2024 01:52
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/testAppoint'
export const getMyTestAppointment = (params) => {
    return axios.get(PREFIX + `/`, {params})
}

export const countTestAppointTime = () => {
    return axios.get(PREFIX + '/countAppointment')
}

export const getTestTimetable = (params) => {
    return axios.get(PREFIX + `/getTimetable`, {params})
}

export const getTestUncompletedAppointments = (params) => {
    return axios.get(PREFIX + '/getOngoingAppointByPractId', {params})
}

export const getTestCompletedAppointments = (params) => {
    return axios.get(PREFIX + '/getCompletedAppointByPractId', {params})
}

export const getTestpractAppointDetail = (params) => {
    return axios.get(PREFIX + '/practAppointmentDetail', {params})
}

export const getTestpractAppointDetails = (params) => {
    return axios.get(PREFIX + '/getPractAppointDetails', {params})
}

export const insertTestAppointments = (params) =>{
    return axios.post(PREFIX + '/addTestAppoint', params)
}

export const getTestAbleAppointTime = (params) => {
    return axios.get(PREFIX + '/getAbleAppointTime', {params})
}
