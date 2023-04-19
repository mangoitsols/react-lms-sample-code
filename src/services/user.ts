import { LoginHeader } from "@/common/Tokens/authToken"
import { authHeader } from "@/common/Tokens/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth"

export const HandleProfile = async(userId:any) =>{
  
    // console.log(userId)
    return await axios({
      method: "GET",
      url: `${API.userInfoById}/${userId}`,
      headers: LoginHeader(),
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

  export const HandleUpdateProfile = async(reqData:any) =>{
  
    // console.log(userId)
    return await axios({
      method: "put",
      url: `${API.userUpdateById}/${reqData.id}`,
      headers: LoginHeader(),
      data:reqData,
    }).then((request) => {
      toast.success("Profile updated")
        return request;
      }).catch((error) => {
        if(error.response.status === 400){
          toast.error("Email already exists")
        }else if(error.response.status === 401){
          HandleLogout()
        }else{
          toast.error("User added failed")
        }
        return error;
      })
  }