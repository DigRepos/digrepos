import { SortType, RepositoryData } from "../interfaces"

type fnSort = (datas: RepositoryData[]) => RepositoryData[]

export function sort(type: SortType): fnSort {
  let defnSort
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
    // TODO: 日付ソート
    case "Date":
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
    default:
      return (dataList: RepositoryData[]) => dataList
  }
}
