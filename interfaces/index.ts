
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

export type DraggableItem = {
  idx: string,
  expr: string
}
