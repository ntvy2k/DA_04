import axios, { AxiosResponse } from "axios";
import { Course, dataContent } from "../../moduleType";
import axiosClient from "./axiosClient";
import axiosServer from "./axiosServer";

// api/productApi.js
const courseApi = {
  getAll(): Promise<AxiosResponse<Array<Course>>> {
    const url = `/course`
    return axiosClient.get(url)
  },
  getListChapter(id: number | string): Promise<AxiosResponse<Array<Course>>> {
    const url = `/course/${id}/chapter`
    return axiosClient.get(url)
  },
  postContent(values: any) {
    const url = `/course/1/chapter/1/lesson/1/content/`
    return axiosServer.post(url, values)
  },
  updateContent(id: number, values: any) {
    const url = `/course/1/chapter/4/lesson/${id}/content/1`
    return axiosClient.put(url, values)
  }

};
export default courseApi;
