
export type Owner = {
  name: string,
  avatarUrl: string
}

export type RepositoryData = {
  id: string,
  url: string,
  avatarUrl: string,
  fullName: string,
  description: string,
  homepage: string,
  owner: Owner,
  star: number,
  forksCount: number,
  watchersCount: number,
  topics: string[],
  language: string,
  updatedAt: string
}

export type ModalOverlayStyle = {
  colorHex: string
}

export type ModalStyle = {
  height: string,
  width: string,
  backgroundColorHex: string
}

export type SearchFilterModel = {
  keywords: string[],
  star: {
    low: string,
    high: string
  },
  language: string,
  license: string
}

export type TabKey = 'filter' | 'sort'

// 配列のインデックスと要素を紐づけるため、idxは数値型
export type DraggableItem = {
  idx: number,
  key: string,
  expr: SortType
}

export type SortType = 'Star' | 'Fork' | 'Watch' | 'Date'
