import axios from "axios";


export const axiosLogin = (email: string, password:string) => axios.post(`${process.env.REACT_APP_API_URL}/auth`, {email,password});