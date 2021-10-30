import axios, { AxiosResponse } from "axios";
import { Course, CourseList, dataContent, GroupCourse, listIcon, TopicCourse } from "../../moduleType";

const userApi = {
    changePass(values: any, config: any) {
        const url = `/auth/profile/change-password/`
        return axios.post(url, values, config)
    },
    getProfile(config: any) {
        const url = `/auth/profile/`
        return axios.get(url, config)
    },
    updateProfile(values: any, config: any) {
        const url = `/auth/profile/`
        return axios.put(url, values, config)
    }
}

export default userApi;