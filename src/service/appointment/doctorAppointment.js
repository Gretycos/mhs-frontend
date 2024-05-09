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

export const getUncompletedAppointments = (params) => {
    return axios.get(PREFIX + '/getUncompletedAppointByPractId', {params})
}

export const getCompletedAppointments = (params) => {
    return axios.get(PREFIX + '/getCompletedAppointByPractId', {params})
}

export const getpractAppointDetail = (params) => {
    return axios.get(PREFIX + '/practAppointmentDetail', {params})
}

export const getPractitionerList = (params) => {
    return axios.get(PREFIX + '/getPractitionerList', {params})
}

export const updateStatus = (params) =>{
    return axios.put(PREFIX + '/updateStatus', params)
}

export const getpractAppointDetails = (params) => {
    return axios.get(PREFIX + '/getPractAppointDetails', {params})
}