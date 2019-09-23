import { UPDATE_SEARCHFILTER } from '../actionTypes'
import { SearchFilterModel } from '../../interfaces'

export function setFilter(data: SearchFilterModel) {
    return {
        type: UPDATE_SEARCHFILTER,
        payload: data

    }
}