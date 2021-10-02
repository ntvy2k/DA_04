export interface content {
    type: 'text' | 'playground'
}

export interface contenttext extends content {
    data: string
}