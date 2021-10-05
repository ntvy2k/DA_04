import axios, { AxiosResponse } from "axios";
import { Course, dataContent } from "../../moduleType";
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
  },
  postContent(id: number, values: any) {
    const url = `/course/1/chapter/4/lesson/${id}/content`
    return axiosClient.post(url, values)
  },
  updateContent(id: number, values: any) {
    const url = `/course/1/chapter/4/lesson/${id}/content/1`
    return axiosClient.put(url, values)
  }

};
export default courseApi;
