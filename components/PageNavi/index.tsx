import * as React from "react"
import styled from "../../interfaces/styled-theme"

type Props = {
  pageNum: number
  nowPage: number
  setNowPage: (num: number) => void
}

const PageNaviArea = styled.section`
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
const numArray2StringArray = (numArray: number[]): string[] => {
  if (numArray.length === 0) {
    return []
  }
  return numArray.map(v => String(v))
}

const PageNavi: React.FC<Props> = props => {

  const createInitNumArray = (pageNum: number) => {
    if (pageNum === 0) {
      return []
    } else if (pageNum < 5) {
      return [...Array(pageNum)].map((v, i) => i + 1)
    } else {
      return [1, 2, 3, 4]
    }
  }
  const initialNumArray: number[] = createInitNumArray(props.pageNum)
  const [pageNoArray, setPageNoArray] = React.useState(initialNumArray)
  const MAX_LIMIT_PAGE_NUM = 4

  // ページの表示番号を現在のページ位置から再設定する
  const renewPageNaviArray = (
    nextPage: number,
    allPageNum: number
  ): number[] => {
    let arr: number[] = []
    if (
      nextPage >= pageNoArray[0] &&
      nextPage <= pageNoArray[pageNoArray.length - 1]
    ) {
      // 現在表示されているページ番号に収まる移動の場合は、
      // 同様の配列を返す
      return [...pageNoArray]
    } else {
      // 移動先のページ番号が、表示されていない（隠れている）
      // ページ番号に移動する時
      if (nextPage < pageNoArray[0]) {
        // ページ位置が、現在のページネーションの最小ページよりも小さい場合
        if (nextPage === 1) {
          return [1, 2, 3, 4]
        }
        for (let i = MAX_LIMIT_PAGE_NUM; i > 0; i--) {
          arr.push(pageNoArray[0] - i)
        }
      } else {
        for (let i = 0; i < MAX_LIMIT_PAGE_NUM; i++) {
          if (nextPage + i > allPageNum) {
            break
          }
          arr.push(nextPage + i)
        }
      }
    }

    return arr
  }

  // ページ番号配列に隣接ページ移動'>', 最終ページ移動'>>'を加える
  const makePageNaviStringArray = (
    numArray: number[],
    allPageNum: number
  ): string[] => {
    if (allPageNum < MAX_LIMIT_PAGE_NUM) {
      return numArray2StringArray(numArray)
    } else {
      if (numArray[0] === 1) {
        return [...numArray2StringArray(numArray), ">", ">>"]
      } else if (numArray[numArray.length - 1] === props.pageNum) {
        return ["<<", "<", ...numArray2StringArray(numArray)]
      } else {
        return ["<<", "<", ...numArray2StringArray(numArray), ">", ">>"]
      }
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
    props.setNowPage(pageNo)
    // 新たに作成したページ番号配列
    const numArray: number[] = renewPageNaviArray(Number(pageNo), props.pageNum)
    setPageNoArray(numArray)
    scrollTo(0, 0)
  }

  return (
    <PageNaviArea>
      {makePageNaviStringArray(pageNoArray, props.pageNum).map((v, i) => {
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
