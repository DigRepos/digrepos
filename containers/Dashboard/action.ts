import { RepositoryData } from '../../interfaces'
import { UPDATE_REPOSITORIES } from './actionType'
import { Action } from '../types'

export function updateRepositories(datas: RepositoryData[]): Action {
    return {
        type: UPDATE_REPOSITORIES,
        payload: datas
    }
}