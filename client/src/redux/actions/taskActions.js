import {
    ADD_TASK_SUCCSESS,
    DELETE_TASK_SUCCSESS,
    LOADING_TASKS_SUCCSESS,
    LOADING_TASKS,
    CLEAR_SUCCSESS_MESSAGES,
} from './types'
import axios from 'axios'
import { tokenConfig } from './authActions'
import { getErrorsAction } from './errorActions'

//Send a request to GET all tasks of a specific user based on token's payload (userId)
export const getTasksAction = () => async (dispatch, getState) => {
    dispatch(loadingTasksAction())
    try {
        let res = await axios.get('/api/task/user_tasks', tokenConfig(getState))
        dispatch(loadingTasksSuccsessAction(res.data))
    } catch (e) {
        console.error(e.message)
        dispatch(
            getErrorsAction(
                e.response.data.msg,
                e.response.status,
                'GET_TASKS_ERROR'
            )
        )
    }
}

export const deleteTaskAction = (taskId) => async (dispatch, getState) => {
    dispatch(loadingTasksAction())

    let data = { taskId }
    let config = tokenConfig(getState)

    try {
        //DELETE requests have to be configured this way as opposed to GET and POST
        let res = await axios({
            method: 'delete',
            url: '/api/task/delete',
            data: data,
            ...config,
        })
        dispatch(deleteTaskSuccsessAction(res.data))
        dispatch(getTasksAction())
    } catch (e) {
        console.error(e.message)
        dispatch(
            getErrorsAction(
                e.response.data.msg,
                e.response.status,
                'DELETE_TASK_ERROR'
            )
        )
    }
}

export const addTaskAction = (newTask) => async (dispatch, getState) => {
    dispatch(loadingTasksAction())
    let data = newTask
    let config = tokenConfig(getState)
    try {
        let res = await axios.post('/api/task/add', data, config)
        dispatch(addTaskSuccsessAction(res.data))
        dispatch(getTasksAction())
    } catch (e) {
        console.error(e.message)
        dispatch(
            getErrorsAction(
                e.response.data.msg,
                e.response.status,
                'ADD_TASKS_ERROR'
            )
        )
    }
}

export const loadingTasksAction = () => {
    return { type: LOADING_TASKS }
}

export const loadingTasksSuccsessAction = (data) => {
    return { type: LOADING_TASKS_SUCCSESS, payload: data }
}

export const addTaskSuccsessAction = (data) => {
    return { type: ADD_TASK_SUCCSESS, payload: data }
}

export const deleteTaskSuccsessAction = (data) => {
    return { type: DELETE_TASK_SUCCSESS, payload: data }
}

export const clearSuccsessMessagesAction = () => {
    return { type: CLEAR_SUCCSESS_MESSAGES }
}
