import axios from "axios"
import qs from 'qs'
import { RepositoryData, SearchFilterModel } from "../interfaces"

const instance = axios.create({
  baseURL: "http://localhost:1234",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json"
})

export function fetchRepositoryList(
  requestUrl: string
): Promise<RepositoryData[]> {
  return new Promise<RepositoryData[]>((resolve, reject) => {
    instance
      .get(requestUrl)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function searchRepositories(endpoint: string, filter: SearchFilterModel): Promise<RepositoryData[]> {
  const url = endpoint + '?' + qs.stringify(filter)
  return new Promise<RepositoryData[]>((resolve, reject) => {
    instance
      .get(url)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
