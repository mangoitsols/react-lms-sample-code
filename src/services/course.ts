import { LoginHeader } from "@/common/Tokens/authToken"
import { authHeader } from "@/common/Tokens/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth"

export const HandleCourseGet = async (searchData: any, filterData: any) => {
  const createFilterData = (filterData === null || filterData === '') ? {
    is_chargeable: 0,
    status: 0
  } : filterData
  const API_URL = searchData ? `${API.getCourses}/${searchData}` : `${API.getCourses}`
  return await axios({
    method: "POST",
    url: API_URL,
    headers: LoginHeader(),
    data: createFilterData,
  }).then((request) => {
    return request;
  }).catch((error) => {
    if (error.response.status === 401) {
      HandleLogout()
    } else {
      toast.error("Something went wrong")
    }
    return error;
  })
}

export const HandleCourseGetByID = async (courseId: any) => {
  return await axios({
    method: "GET",
    url: `${API.getCourses}/${courseId}`,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Course added failed");
      }
      return error;
    });
};

export const HandleCourseUpdate = async (courseId: any, updateData: any) => {
  return await axios({
    method: "PUT",
    url: `${API.updateCourse}/${courseId}`,
    headers: LoginHeader(),
    data: updateData,
  })
    .then((request) => {
      toast.success("Course Updated Successfully");
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Course added failed");
      }
      return error;
    });
};

export const HandleCourseCreate = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.createCourse}`,
    headers: LoginHeader(),
    data: reqData,
  }).then((request) => {
    toast.success("Course Created")
    return request;
  }).catch((error) => {
    if (error.response.status === 401) {
      HandleLogout()
    } else {
      toast.error("Course added failed")
    }
    return error;
  })
}

export const HandleCourseDelete = async (rowID: any) => {
  return await axios({
    method: "DELETE",
    url: `${API.deleteCourse}/${rowID}`,
    headers: LoginHeader(),
  }).then((request) => {
    toast.success("Course Deleted Successfully")
    return request;
  }).catch((error) => {
    if (error.response.status === 401) {
      HandleLogout()
    } else {
      toast.error("Something went wrong")
    }
    return error;
  })
}

export const HandleCourseByCourseId = async (subId: any) => {
  return await axios({
    method: "GET",
    url: `${API.getCoursesByCouseId}/${subId}`,
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