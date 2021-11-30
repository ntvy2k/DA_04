import axios, { AxiosResponse } from "axios";

const exerciseClient = {
    getExercise(): Promise<AxiosResponse<any>> {
        const url = `/ex/p/exercise/`
        return axios.get(url)
    },
    getQuiz(exerciseId: any): Promise<AxiosResponse<any>> {
        const url = `/ex/p/exercise/${exerciseId}/`
        return axios.get(url)
    },
    submitAnswer(exerciseId: any, questionId: any, listOption: any): Promise<AxiosResponse<any>> {
        const url = `/ex/p/exercise/${exerciseId}/get-answer/?question=${questionId}${listOption}`
        return axios.get(url)
    }
}

export default exerciseClient