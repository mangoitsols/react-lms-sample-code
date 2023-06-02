import { LoginHeader } from "@/common/Tokens/authToken"
import { authHeader } from "@/common/Tokens/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth"

  export const HandleModuleGet = async(searchData:any,filterData:any) =>{
    const API_URL = searchData ? `${API.getAllModules}/${searchData}` : `${API.getAllModules}`
    return await axios({
      method: "POST",
      url: API_URL,
      headers: LoginHeader(),
      data: filterData,
    }).then((request) => {
        return request;
      }).catch((error) => {
        if(error.response.status === 401){
          HandleLogout()
        }else{
          toast.error("Something went wrong")
        }
        return error;
      })
  }

  export const HandleModuleGetByID = async (moduelId: any) => {
    return await axios({
      method: "GET",
      url: `${API.getAllModules}/${moduelId}`,
      headers: LoginHeader(),
    })
      .then((request) => {
        return request;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          HandleLogout();
        } else {
          toast.error("Module added failed");
        }
        return error;
      });
  };

  export const HandleModuleUpdate = async (moduleId: any, updateData: any) => {
    return await axios({
      method: "PUT",
      url: `${API.updateModule}/${moduleId}`,
      headers: LoginHeader(),
      data: updateData,
    })
      .then((request) => {
        toast.success("Module Updated Successfully");
        return request;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          HandleLogout();
        } else {
          toast.error("Module added failed");
        }
        return error;
      });
  };

  export const HandleModuleCreate = async(reqData:any) =>{
    return await axios({
      method: "POST",
      url: `${API.createModule}`,
      headers: LoginHeader(),
      data:reqData,
    }).then((request) => {
      toast.success("Module Created")
        return request;
      }).catch((error) => {
        if(error.response.status === 401){
          HandleLogout()
        }else{
          toast.error("Module added failed")
        }
        return error;
      })
  }