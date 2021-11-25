import axios, { AxiosResponse } from "axios"

const exerciseApi = {
    getExercise(config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/`
        return axios.get(url, config)
    },
    getUser(config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/get-users/`
        return axios.get(url, config)
    },
    postExercise(value: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/`
        return axios.post(url, value, config)
    },
    updateExercise(value: any, idExercise: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/${idExercise}/`
        return axios.put(url, value, config)
    }
}

export default exerciseApi