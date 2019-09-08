import axios from "axios"
import { RepositoryData } from "../interfaces"

const instance = axios.create({
  baseURL: "http://localhost:1234",
  timeout: 5000,
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
