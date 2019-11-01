import { SortType, RepositoryData } from "../interfaces"
import dayjs from 'dayjs'

type fnSort = (datas: RepositoryData[]) => RepositoryData[]

export function fnSortFactory(type: SortType): fnSort {
  switch (type) {
    case "Star":
      return (dataList: RepositoryData[]) => {
        return dataList.sort((a: RepositoryData, b: RepositoryData) => {
          const aNum = a.star
          const bNum = b.star
          if (aNum < bNum) {
            return 1
          } else if (aNum >= bNum) {
            return -1
          } else {
            return 0
          }
        })
      }
    case "Fork":
      return (dataList: RepositoryData[]) => {
        return dataList.sort((a: RepositoryData, b: RepositoryData) => {
          const aNum = a.forksCount
          const bNum = b.forksCount
          if (aNum < bNum) {
            return 1
          } else if (aNum >= bNum) {
            return -1
          } else {
            return 0
          }
        })
      }
    case "Watch":
      return (dataList: RepositoryData[]) => {
        return dataList.sort((a: RepositoryData, b: RepositoryData) => {
          const aNum = a.watchersCount
          const bNum = b.watchersCount
          if (aNum < bNum) {
            return 1
          } else if (aNum >= bNum) {
            return -1
          } else {
            return 0
          }
        })
      }
    case "Date":
      return (dataList: RepositoryData[]) => {
        return dataList.sort((a: RepositoryData, b: RepositoryData) => {
          const dayA = dayjs(a.updatedAt)
          const dayB = dayjs(b.updatedAt)
          if (dayA.isBefore(dayB)) {
            return 1
          } else if (dayA.isAfter(dayB)) {
            return -1
          } else {
            return 0
          }
        })
      }
    default:
      return (dataList: RepositoryData[]) => dataList
  }
}
