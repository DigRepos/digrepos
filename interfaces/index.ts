
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
