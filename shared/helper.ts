import { SortType, RepositoryData } from "../interfaces"
import dayjs from "dayjs"

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

// 数値配列 → 文字列配列の変換
export function numArray2StringArray(numArray: number[]): string[] {
  return numArray.map(v => String(v))
}

// 全ページ数計算
export function computeAllPageNum(repoLength: number, perPage: number): number {
  console.log("[computeAllPageNum] repoLength", repoLength)
  console.log("[computeAllPageNum] perPage", perPage)
  const split = Math.floor(repoLength / perPage)
  console.log("[computeAllPageNum] split", split)
  const syou = repoLength % perPage
  console.log("[computeAllPageNum] syou", syou)
  if (syou > 0) {
    return split + 1
  }
  return split
}
