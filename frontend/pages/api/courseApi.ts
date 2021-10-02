import { AxiosResponse } from "axios";
import { Course } from "../../moduleType";
import axiosClient from "./axiosClient";

// api/productApi.js
const courseApi = {
  getAll(): Promise<AxiosResponse<Array<Course>>> {
    const url = `/course`
    return axiosClient.get(url)
  },
  getListChapter(id: number | string): Promise<AxiosResponse<Array<Course>>> {
    const url = `/course/${id}/chapter`
    return axiosClient.get(url)
  }
};
export default courseApi;
