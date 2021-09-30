export interface Course {
    name: string,
    author: string,
    id: number,
    created_at: string,
    last_modified: string,
}

export interface Chapter {
    id: number,
    name: string,
    created_at: string,
    last_modified: string,
    course: number
}