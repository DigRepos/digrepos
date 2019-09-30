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

type PageNoProps = {
  bgColorHex: string
}

const PageNo = styled.div<PageNoProps>`
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
  border-style: solid;
  border-width: 0.8px;
  border-color: ${props => "#" + props.bgColorHex}
  &:hover {
    background-color: #e1f5fe;
    color: #81d4fa;
  }
`

// 数値配列 → 文字列配列の変換
const numArray2StringArray = (numArray: number[]) => {
  return numArray.map(v => String(v))
}

const PageNavi: React.FC<Props> = props => {
  const initialNumArray: number[] = [1, 2, 3, 4]
  const [pageNoArray, setPageNoArray] = React.useState(initialNumArray)
  const MAX_LIMIT_PAGE_NUM = 4

  // ページの表示番号を現在のページ位置から再設定する
  const renewPageNaviArray = (nextPage: number): number[] => {
    let arr: number[] = []
    if (pageNoArray[0] > nextPage) {
      for (let i = MAX_LIMIT_PAGE_NUM; i > 0; i--) {
        arr.push(nextPage - (i - 1))
      }
    } else {
      for (let i = 0; i < MAX_LIMIT_PAGE_NUM; i++) {
        arr.push(nextPage - i)
      }
    }
    return arr
  }

  // ページ番号配列に隣接ページ移動'>', 最終ページ移動'>>'を加える
  const makePageNaviStringArray = (numArray: number[]): string[] => {
    if (numArray[0] === 1 && numArray.length < MAX_LIMIT_PAGE_NUM) {
      return numArray2StringArray(numArray)
    } else if (numArray[0] === 1 && numArray.length > MAX_LIMIT_PAGE_NUM) {
      return [...numArray2StringArray(numArray), ">", ">>"]
    } else if (numArray[numArray.length - 1] === props.pageNum) {
      return ["<<", "<", ...numArray2StringArray(numArray)]
    } else {
      return numArray2StringArray(numArray)
    }
  }

  const handlePageNoClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    const pageNoText = e.currentTarget.innerText
    let pageNo: number = 0
    switch (pageNoText) {
      case ">":
        pageNo = props.nowPage + 1
        break
      case ">>":
        pageNo = props.pageNum
        break
      case "<":
        pageNo = props.nowPage - 1
        break
      case "<<":
        pageNo = 1
        break
      default:
        pageNo = Number(pageNoText)
    }
    props.setNowPage(Number(pageNo))
    // 新たに作成したページ番号配列
    const numArray: number[] = renewPageNaviArray(Number(pageNo))
    setPageNoArray(numArray)
    scrollTo(0, 0)
  }

  return (
    <PageNaviArea>
      {makePageNaviStringArray(pageNoArray).map((v, i) => {
        const p: PageNoProps = {
          bgColorHex: i + 1 === props.nowPage ? "e1f5fe" : "FFFFFF"
        }
        return (
          <PageNo
            {...p}
            className={"page-no"}
            key={i}
            onClick={e => handlePageNoClicked(e)}
          >
            {v}
          </PageNo>
        )
      })}
    </PageNaviArea>
  )
}

export default PageNavi
