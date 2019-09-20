import * as React from "react"
import styled from "../../interfaces/styled-theme"
import { SearchFilterModel } from "../../interfaces"
import { loadGetInitialProps } from "next-server/dist/lib/utils"

// TODO
// storeの導入

const HeaderTitle = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  padding: 8px;
  margin: 8px;
  color: #9e9e9e;
`

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

const SearchComponent = styled.div`
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
  updateSearchFilter: (current: SearchFilterModel) => void
}

const SearchFilter: React.FC<Props> = props => {
  const [state, setState] = React.useState(props.model)

  const updateByKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { keyword: [e.target.value] }
    setState(Object.assign({}, state, data))
  }
  const updateByLowerStar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { star: { low: e.target.value, high: props.model.star.high } }
    setState(Object.assign({}, state, data))
  }
  const updateByLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { language: [e.target.value] }
    setState(Object.assign({}, state, data))
  }
  const updateByLicense = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { license: [e.target.value] }
    setState(Object.assign({}, state, data))
  }
  
  return (
    <>
      <SearchComponent>
        <HeaderTitle>Filter</HeaderTitle>
      </SearchComponent>
      <SearchComponent>
        <SearchKey>Keyword</SearchKey>
        <SearchInput
          onChange={e => updateByKeyword(e)}
          defaultValue={props.model.keyword}
        />
      </SearchComponent>
      <SearchComponent>
        <SearchKey>Star</SearchKey>
        <StarInputArea>
          <StarInput
            onChange={e => updateByLowerStar(e)}
            defaultValue={props.model.star.low}
          />
          <StarInput />
        </StarInputArea>
      </SearchComponent>
      <SearchComponent>
        <SearchKey>Language</SearchKey>
        <SearchInput
          onChange={e => updateByLanguage(e)}
          defaultValue={props.model.language}
        />
      </SearchComponent>
      <SearchComponent>
        <SearchKey>License</SearchKey>
        <SearchInput
          onChange={e => updateByLicense(e)}
          defaultValue={props.model.license}
        />
      </SearchComponent>
      <SearchButtonArea>
        <Button>Search</Button>
      </SearchButtonArea>
    </>
  )
}

export default SearchFilter
