import axiosClient from "./axiosClient";

// api/productApi.js
const courseApi = {
  getAll: () => {
    const url = "/course"
    return axiosClient.get(url)
  },
  getListChapter: (id: number) => {
    const url = `/course/${id}/chapter`
    return axiosClient.get(url)
  }
};
export default courseApi;
