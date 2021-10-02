export interface Generate {
    id: number,
    created_at: string,
    last_modified: string,
}

export interface Course extends Generate {
    name: string,
    author: string,
}

export interface Chapter extends Generate {
    name: string,
    course: number
}