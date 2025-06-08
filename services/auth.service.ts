import { Axios } from "@/libs/axios-config";
import { LoginParam } from "./types";

export const ApiServiceAuth = {
  LoginAuthService: async (body: LoginParam) => {
    const { data } = await Axios.post(`auth`, body);
    localStorage.setItem("user", data);
    return data;
  },
  RegisterAuthService: async (body: any) => {
    const { data } = await Axios.post(`signup`, body);
    return data;
  },

  GetCountriesQuery: async () => {
    const { data } = await Axios.get(`getcountries`);
    return data;
  },
 

  GetCitiesQuery: async (body: any) => {
    const { data } = await Axios.get(`getcities`, {
      params: {
        countryId: body,
        citiId: 0,
      },
    });
    return data;
  },
  GetEmploymentStatusQuery: async () => {
    const { data } = await Axios.get(`getemploymentstatus`);
    return data;
  },
  GetProfessionsQuery: async () => {
    const { data } = await Axios.get(`getprofession`);
    return data;
  },
};
