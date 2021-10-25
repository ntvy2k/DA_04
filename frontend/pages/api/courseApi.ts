import axios, { AxiosResponse } from "axios";
import { CourseList, dataContent, GroupCourse, listIcon, TopicCourse } from "../../moduleType";

// api/productApi.js
const courseApi = {
  getAll(): Promise<AxiosResponse<Array<CourseList>>> {
    const url = `/api/course`
    return axios.get(url)
  },
  getListChapter(id: number | string | string[] | undefined): Promise<AxiosResponse<Array<any>>> {
    const url = `/api/course/${id}/chapter`
    return axios.get(url)
  },
  getListLesson(course: any, chapter: any) {
    const url = `/api/course/${course}/chapter/${chapter}/lesson`
    return axios.get(url)
  },
  getGroupCourse(): Promise<AxiosResponse<Array<GroupCourse>>> {
    const url = '/api/group'
    return axios.get(url)
  },
  getTopicCourse(): Promise<AxiosResponse<Array<TopicCourse>>> {
    const url = '/api/topic'
    return axios.get(url)
  },
  getListIcon(): Promise<AxiosResponse<Array<listIcon>>> {
    const url = '/api/icon'
    return axios.get(url)
  },
  postContent(values: any, courseID: any, chapterID: any, lessonID: any, config: any) {
    const url = `/api/course/${courseID}/chapter/${chapterID}/lesson/${lessonID}/content/`
    return axios.post(url, values, config)
  },
  postCourse(values: any, config: any) {
    const url = `/api/course/`
    return axios.post(url, values, config)
  },
  postChapter(values: any, slugCourse: any, config: any) {
    const url = `/api/course/${slugCourse}/chapter/`
    return axios.post(url, values, config)
  },
  postLesson(values: any, slugCourse: any, slugChpater: any, config: any) {
    const url = `/api/course/${slugCourse}/chapter/${slugChpater}/lesson/`
    return axios.post(url, values, config)
  },
  updateContent(id: number, values: any) {
    const url = `/api/course/1/chapter/4/lesson/${id}/content/1`
    return axios.put(url, values)
  },
  getContentList(courseID: number | string | undefined, chapterID: number | undefined, lessonID: number | string | undefined) {
    const url = `/api/course/${courseID}/chapter/${chapterID}/lesson/${lessonID}/content`
    return axios.get(url)
  }

};
export default courseApi;
