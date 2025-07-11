/**
 * author: Tsong
 * time: 03/05/2024 18:00
 */
import axios from "@/common/js/axios.js";

const PREFIX = '/practitioner'

export const loginPract = (params) => {
  return axios.post(PREFIX + '/login', params)
}

export const logoutPract = () => {
  return axios.delete(PREFIX + '/logout')
}

export const getPractitionerInfo = (params) => {
  return axios.get(PREFIX + '/info', {params})
}

export const getPractRole = () =>{
  return axios.get(PREFIX + '/findRole')
}
