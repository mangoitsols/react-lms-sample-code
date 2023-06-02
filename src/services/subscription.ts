import { LoginHeader } from "@/common/Tokens/authToken";
import { authHeader } from "@/common/Tokens/authToken";
import { API } from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";

export const HandleSubscriptionGet = async () => {
  const API_URL = `${API.getSubscription}`;
  return await axios({
    method: "GET",
    url: API_URL,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Something went wrong");
      }
      return error;
    });
};

export const HandleSubscriptionGetByID = async (subId: any) => {
  return await axios({
    method: "GET",
    url: `${API.getSubsById}/${subId}`,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("subscription failed");
      }
      return error;
    });
};
export const HandleSubscriptionGetByUserID = async (subId: any) => {
  return await axios({
    method: "GET",
    url: `${API.getSubscription}/${subId}`,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("subscription failed");
      }
      return error;
    });
};

export const HandleSubscriptionPayment = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.acceptpayment}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((responce) => {
      return responce?.data?.returnurl;
    })
    .catch((error) => {
      if (error.response.status === 401) HandleLogout();
      else return error;
    });
};

export const HandleSearchSubsGet = async (searchData: any, data: any) => {
  const dd = {
    id: data,
  };
  const API_URL = searchData
    ? `${API.getSubscription}/${searchData}`
    : `${API.getSubscription}`;
  return await axios({
    method: "POST",
    url: API_URL,
    headers: LoginHeader(),
    data: dd,
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Something went wrong");
      }
      return error;
    });
};

export const HandleSubscriptionUpdate = async (id: any, reqData: any) => {
  return await axios({
    method: "PUT",
    url: `${API.updateSubscription}/${id}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((request) => {
      toast.success(
        `Subscription ${capitalizeFirstLetter(reqData?.status)} Successfully`
      );
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Something went wrong!");
      }
      return error;
    });
};
