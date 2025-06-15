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

  GetDashboardService: async (body: any) => {
    const { data } = await Axios.get(`getuserdashboard/${body}`);
    return data;
  },

  SendMoneyService: async (body: any) => {
    const { data } = await Axios.post(`sbm`, body);
    return data;
  },
  SendMoneySingleService: async (body: any) => {
    const { data } = await Axios.post(`sm`, body);
    return data;
  },
  UploadFile: async (body: any) => {
    const { data } = await Axios.post(`FileUploadAPI/${body?.id}`, body?.data);
    return data;
  },

  GetCountriesQuery: async () => {
    const { data } = await Axios.get(`getcountries`);
    return data;
  },

  GetBanksQuery: async () => {
    const { data } = await Axios.get(`getbanks`);
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

  GetBeneficiariesQuery: async (userId: string) => {
    const { data } = await Axios.get(`getuserbeneficiaries`, {
      params: {
        userId,
        beneficiaryId: 0,
      },
    });
    return data;
  },

  GetPaymentChannelsQuery: async () => {
    const { data } = await Axios.get(`getpaymentchannel`);
    return data;
  },
  GetPayoutChannelsQuery: async () => {
    const { data } = await Axios.get(`getpayoutchannel`);
    return data;
  },

  GetCurrencyQuery: async () => {
    const { data } = await Axios.get(`getcurrency`);
    return data;
  },
  NameEnquiry: async (body:any) => {
    const { data } = await Axios.get(`BankDetailsLookUp`, {
      params: body,
    });
    return data;
  },
  AddBeneficiaryMutation: async (body:any) => {
    const { data } = await Axios.post(`adduserbeneficiary`, body);
    return data;
  },
  GetRatesQuery: async (body: {
    toCurrencyId: any;
    fromCurrencyId: any;
    fromAmount: any;
    toAmount: any;
    roleId: any;
    userId: any;
  }) => {
    const { data } = await Axios.get(`getrate`, {
      params: body,
    });
    return data;
  },

  GetRatesAgentQuery: async (body: {
    toCurrencyId: any;
    fromCurrencyId: any;
    fromAmount: any;
    toAmount: any;
    agentId: any;
    userId: any;
  }) => {
    const { data } = await Axios.get(`agentcustomersgetrate`, {
      params: body,
    });
    return data;
  },

  GetPurposesQuery: async () => {
    const { data } = await Axios.get(`gettransferpurpose`);
    return data;
  },

  GetIdTypesQuery: async () => {
    const { data } = await Axios.get(`getidtypes`);
    return data;
  },
  CheckUserDocumentMutation: async (body: any) => {
    const { data } = await Axios.post(
      `checkifusertransactionrequiredocument`,
      body
    );
    return data;
  },
};
