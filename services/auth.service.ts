import { Axios } from "@/libs/axios-config";
import { LoginParam } from "./types";

export const ApiServiceAuth = {
    LoginAuthService: async (body:LoginParam) => {
        const { data } = await Axios.post(`auth`, body);
        localStorage.setItem("token", data?.data?.token);
        console.log(data);
        return data;
    },
 /*    RegisterAuthService: async (body) => {
        const { data } = await Axios.post(`auth/register`, body);
        return data;
    }, */
    
};

