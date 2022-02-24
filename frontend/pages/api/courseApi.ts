import axios, { AxiosResponse } from "axios";
import { Course, CourseList, dataContent, GroupCourse, listIcon, TopicCourse } from "../../moduleType";

// api/productApi.js
const courseApi = {
  getAll(): Promise<AxiosResponse<Array<CourseList>>> {
    const url = `/api/course`
    return axios.get(url)
  },
  getCourse(courseID: any): Promise<AxiosResponse<any>> {
    const url = `/api/course/${courseID}/`
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
  getMyCourse(config: any): Promise<AxiosResponse<Array<CourseList>>> {
    const url = '/api/owner/course'
    return axios.get(url, config)
  },
  getMyCourseByID(slug: any, config: any): Promise<AxiosResponse<Course>> {
    const url = `/api/owner/course/${slug}/`
    return axios.get(url, config)
  },
  getMyContent(slugCourse: any, chapterId: any, lessonId: any, config: any): Promise<AxiosResponse<any>> {
    const url = `/api/owner/course/${slugCourse}/chapter/${chapterId}/lesson/${lessonId}/content/`
    return axios.get(url, config)
  },
  getMyContentById(slugCourse: any, chapterId: any, lessonId: any, contentId: any, config: any): Promise<AxiosResponse<any>> {
    const url = `/api/owner/course/${slugCourse}/chapter/${chapterId}/lesson/${lessonId}/content/${contentId}/`
    return axios.get(url, config)
  },
  getPulish(slugCourse: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/make-publish/`
    return axios.get(url, config)
  },
  postContent(values: any, courseID: any, chapterID: any, lessonID: any, config: any) {
    const url = `/api/owner/course/${courseID}/chapter/${chapterID}/lesson/${lessonID}/content/`
    return axios.post(url, values, config)
  },
  postCourse(values: any, config: any) {
    const url = `/api/owner/course/`
    return axios.post(url, values, config)
  },
  postChapter(values: any, slugCourse: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/chapter/`
    return axios.post(url, values, config)
  },
  postLesson(values: any, slugCourse: any, slugChapter: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/chapter/${slugChapter}/lesson/`
    return axios.post(url, values, config)
  },
  updateCourse(values: any, slug: any, config: any) {
    const url = `/api/owner/course/${slug}/`
    return axios.put(url, values, config)
  },
  updateContent(values: any, courseID: any, chapterID: any, lessonID: any, contentId: any, config: any) {
    const url = `/api/owner/course/${courseID}/chapter/${chapterID}/lesson/${lessonID}/content/${contentId}/`
    return axios.put(url, values, config)
  },
  updateChapter(values: any, slugCourse: any, slugChapter: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/chapter/${slugChapter}/`
    return axios.put(url, values, config)
  },
  updateLesson(values: any, slugCourse: any, slugChapter: any, slugLesson: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/chapter/${slugChapter}/lesson/${slugLesson}/`
    return axios.put(url, values, config)
  },
  deleteCourse(slugCourse: string, config: any) {
    const url = `/api/owner/course/${slugCourse}/`
    return axios.delete(url, config)
  },
  deleteChapter(slugCourse: any, slugChapter: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/chapter/${slugChapter}/`
    return axios.delete(url, config)
  },
  deleteLesson(slugCourse: any, slugChapter: any, slugLesson: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/chapter/${slugChapter}/lesson/${slugLesson}/`
    return axios.delete(url, config)
  },
  deleteContent(courseID: any, chapterID: any, lessonID: any, contentId: any, config: any) {
    const url = `/api/owner/course/${courseID}/chapter/${chapterID}/lesson/${lessonID}/content/${contentId}/`
    return axios.delete(url, config)
  },
  publishCourse(slugCourse: any, values: any, config: any) {
    const url = `/api/owner/course/${slugCourse}/make-publish/`
    return axios.put(url, values, config)
  },
  getContentList(courseID: number | string | undefined, chapterID: number | undefined, lessonID: number | string | undefined) {
    const url = `/api/course/${courseID}/chapter/${chapterID}/lesson/${lessonID}/content`
    return axios.get(url)
  }

};
export default courseApi;
