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
    getQuiz(config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/`
        return axios.get(url, config)
    },
    getQuizById(idQuizz: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${idQuizz}/`
        return axios.get(url, config)
    },
    getQuestion(idQuizz: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${idQuizz}/question/`
        return axios.get(url, config)
    },
    getQuestionById(idQuizz: any, idQuestion: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${idQuizz}/question/${idQuestion}/`
        return axios.get(url, config)
    },
    getOption(idQuizz: any, idQuestion: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${idQuizz}/question/${idQuestion}/option/`
        return axios.get(url, config)
    },
    postExercise(value: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/`
        return axios.post(url, value, config)
    },
    postQuizz(value: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/`
        return axios.post(url, value, config)
    },
    postQuestion(value: any, idQuizz: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${idQuizz}/question/`
        return axios.post(url, value, config)
    }, postOption(value: any, quizId: any, questionId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/question/${questionId}/option/`
        return axios.post(url, value, config)
    },
    updateExercise(value: any, idExercise: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/${idExercise}/`
        return axios.put(url, value, config)
    },
    updateQuizz(value: any, quizId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/`
        return axios.put(url, value, config)
    },
    updateQuestion(value: any, quizId: any, questionId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/question/${questionId}/`
        return axios.put(url, value, config)
    },
    updateOption(value: any, quizId: any, questionId: any, optionId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/question/${questionId}/option/${optionId}/`
        return axios.put(url, value, config)
    },
    deleteQuizz(quizId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/`
        return axios.delete(url, config)
    },
    deleteExercise(idExercise: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/${idExercise}/`
        return axios.delete(url, config)
    },
    deleteQuestion(quizId: any, questionId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/question/${questionId}/`
        return axios.delete(url, config)
    },
    deleteOption(quizId: any, questionId: any, optionId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/question/${questionId}/option/${optionId}/`
        return axios.delete(url, config)
    },
    confirmQuestion(quizId: any, questionId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/question/${questionId}/make-confirm/`
        return axios.put(url, '', config)
    },
    pulishQuestion(quizId: any, questionId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/quiz/${quizId}/question/${questionId}/make-ready/`
        return axios.put(url, '', config)
    },
    pulishExercise(exerciseId: any, config: any): Promise<AxiosResponse<any>> {
        const url = `/ex/creator/exercise/${exerciseId}/make-publish/`
        return axios.put(url, '', config)
    }
}

export default exerciseApi