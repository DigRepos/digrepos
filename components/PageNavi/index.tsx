import * as React from "react"
import styled from "../../interfaces/styled-theme"

type Props = {
  pageNum: number
  nowPage: number
  setNowPage: (num: number) => void
}

const PageNaviArea = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  height: auto;
  padding: 8px;
`

const PageNo = styled.div`
  border-radius: 50%;
  width: 36px;
  height: 14px;
  padding: 16px;
  margin: 16px;
  color: #42a5f5;
  font-size: 110%;
  text-align: center;
  cursor: pointer;
  transition-property: all;
  transition: 0.1s linear;
  &:hover {
    background-color: #e1f5fe;
    color: #81d4fa;
  }
`

const numToSerialArray = (num: number): string[] => {
  return [...Array(num)].map((v, i) => String(i + 1))
}

const PageNavi: React.FC<Props> = props => {
  const handlePageNoClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    const pageNo = e.currentTarget.innerText
    props.setNowPage(Number(pageNo))
    scrollTo(0, 0)
  }
  const MAX_PAGE = 5
  let pageNoArray: string[] = []
  if (props.pageNum > MAX_PAGE) {
    pageNoArray = numToSerialArray(4)
    pageNoArray.push(">>")
  } else {
    pageNoArray = numToSerialArray(props.pageNum)
  }

  return (
    <PageNaviArea>
      {pageNoArray.map((v, i) => (
        <PageNo className={'page-no'} key={i} onClick={e => handlePageNoClicked(e)}>
          {v}
        </PageNo>
      ))}
    </PageNaviArea>
  )
}

export default PageNavi
