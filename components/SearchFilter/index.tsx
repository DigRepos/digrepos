import React, { FC, useState, useEffect } from "react"
import styled from "../../interfaces/styled-theme"
import { RepositoryData, SearchFilterModel, SortType } from "../../interfaces"
import { searchRepositories } from "../../api"
import { fnSortFactory } from "../../shared/helper"

const SearchKey = styled.div`
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  color: #616161;
`

const SearchInput = styled.input`
  border-style: none;
  height: 24px;
  padding: 8px;
  margin: 4px;
  border-radius: 2px;
  font-weight: 100;
  font-size: 1.1em;
`
const StarInputArea = styled.div`
  display: flex;
  justify-content: space-between;
`

const StarInput = styled(SearchInput)`
  width: 35%;
`

const SearchComponent = styled.section`
  padding: 4px;
  margin: 8px;
`

const SearchButtonArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
  margin: 8px;
  margin-top: 90px;
`

const Button = styled.button`
  border-radius: 16px;
  font-weight: 200;
  width: 80%;
  height: 40px;
  font-size: 1.1em;
  cursor: pointer;
  color: #ffffff;
  border-color: #11a872;
  background-color: #11a872;
`
type Props = {
  model: SearchFilterModel
  sortOrder: SortType[]
  updateSearchFilter: (current: SearchFilterModel) => void
  updateRepositoryDatas: (fetched: RepositoryData[]) => void
  updateDashboardState: (repos: RepositoryData[]) => void
  initUpdatePageNavi: (repoLength: number) => void
}

const SearchFilter: FC<Props> = props => {
  const [state, setState] = useState(props.model)

  // TODO 何やってる？？
  useEffect(() => {
    return () => {
      props.updateSearchFilter(state)
    }
  })

  const updateByKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputStr: string = e.target.value
    let strArr: string[] = inputStr.split(",").map(v => v.trim())
    const data: Pick<SearchFilterModel, "keywords"> = {
      keywords: strArr
    }
    setState(Object.assign({}, state, data))
  }
  const updateByLowerStar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data: Pick<SearchFilterModel, "star"> = {
      star: { low: e.target.value, high: props.model.star.high }
    }
    setState(Object.assign({}, state, data))
  }
  const updateByHigherStar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data: Pick<SearchFilterModel, "star"> = {
      star: { low: props.model.star.high, high: e.target.value }
    }
    setState(Object.assign({}, state, data))
  }
  const updateByLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data: Pick<SearchFilterModel, "language"> = {
      language: e.target.value
    }
    setState(Object.assign({}, state, data))
  }
  const updateByLicense = (e: React.FormEvent<HTMLInputElement>) => {
    const data: Pick<SearchFilterModel, "license"> = {
      license: e.currentTarget.value
    }
    setState(Object.assign({}, state, data))
  }

  // ソートを指定順に適用
  const sort = (datas: RepositoryData[]): RepositoryData[] => {
    // ストアに保存されているデータを直接参照していると、ストアのデータまで
    // 反転してしまうため、concatでdeepcopyしてから使用
    const sortOrder = ([] as SortType[]).concat(props.sortOrder).reverse()
    const fnSortArray = sortOrder.map(v => fnSortFactory(v))
    let sorted: RepositoryData[] = datas
    for (const fnSort of fnSortArray) {
      sorted = fnSort(sorted)
    }
    return sorted
  }

  // 検索ボタン押下時イベント
  const searchButtonClickedHandler = async () => {
    props.updateSearchFilter(state)
    const datas: RepositoryData[] = await searchRepositories("/filter", state)
    console.log("repository list", datas)
    const repos = sort(datas)
    props.updateRepositoryDatas(repos)
    props.updateDashboardState(repos)
    // ページナビゲーションの更新
    props.initUpdatePageNavi(repos.length)
  }

  return (
    <>
      <SearchComponent>
        <SearchKey>Keyword</SearchKey>
        <SearchInput
          className={"search-keywords"}
          onChange={e => updateByKeyword(e)}
          defaultValue={props.model.keywords.join(",")}
          maxLength={50}
        />
      </SearchComponent>
      <SearchComponent>
        <SearchKey>Star</SearchKey>
        <StarInputArea>
          <StarInput
            onChange={e => updateByLowerStar(e)}
            defaultValue={props.model.star.low}
            maxLength={5}
          />
          <StarInput
            onChange={e => updateByHigherStar(e)}
            defaultValue={props.model.star.high}
            maxLength={5}
          />
        </StarInputArea>
      </SearchComponent>
      <SearchComponent>
        <SearchKey>Language</SearchKey>
        <SearchInput
          onChange={e => updateByLanguage(e)}
          defaultValue={props.model.language}
          maxLength={10}
        />
      </SearchComponent>
      <SearchComponent>
        <SearchKey>License</SearchKey>
        <SearchInput
          onChange={e => updateByLicense(e)}
          defaultValue={props.model.license}
          maxLength={10}
        />
      </SearchComponent>
      <SearchButtonArea>
        <Button onClick={e => searchButtonClickedHandler()}>Search</Button>
      </SearchButtonArea>
    </>
  )
}

export default SearchFilter
