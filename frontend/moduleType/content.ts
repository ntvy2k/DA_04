export interface content {
    type: 'text' | 'playground'
}

export interface contenttext extends content {
    data: string
}

export interface valuePlayGround {
    value: String,
    language: String,
    button: boolean
}

export interface dataContent {
    id: number,
    type: string,
    value: String | valuePlayGround,
}