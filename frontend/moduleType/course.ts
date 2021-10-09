import { dataContent } from ".";

export interface Generate {
    id: number | string,
    created_at: string,
    last_modified: string,
}

export interface CourseList extends Generate {
    name: string,
    author: string,
    slug: string,
}

export interface Course extends CourseList {
    chapters: Array<ChapterInfo>
}



export interface ChapterList extends Generate {
    name: string,
    course: number,
}

export interface ChapterInfo {
    id: number,
    name: string
    lessons: Array<LessonInfo>
}

export interface ChapterInstance extends ChapterList {
    lessons: Array<LessonInfo>
}

export interface LessonInfo {
    id: number,
    name: string
}

export interface LessonList extends Generate {
    name: string,
    chapter: number
}

export interface LessonInstance extends LessonList {
    contents: Array<ContentInfo>
}

export interface ContentInfo {
    id: number,
    title: string
}

export interface ContentList {
    id: number,
    lesson: string,
    title: string,
    content: any
}

