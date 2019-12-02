import React, { FC, useState } from "react"
import styled from "../../interfaces/styled-theme"
import { PageNaviState } from "../../interfaces"
import { numArray2StringArray } from "../../shared/helper"

type Props = {
  pageNavi: PageNaviState
  setNowPage: (now: number) => void
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

const PageNavi: FC<Props> = props => {
  const makePageNoArray = (pageNum: number) => {
    console.log("[PageNavi] makeNumArray pageNum", pageNum)
    if (pageNum === 0) {
      return []
    } else if (pageNum < 5) {
      return [...Array(pageNum)].map((_, i) => i + 1)
    } else {
      return [1, 2, 3, 4]
    }
  }

  const [pageNoArray, setPageNoArray] = useState(
    makePageNoArray(props.pageNavi.allPageNum)
  )
  const MAX_LIMIT_PAGE_NUM = 4

  // ページの表示番号を現在のページ位置から再設定する
  // ページ番号の押下時に見せるページネーションを再設定する
  const updatePageNoArray = (
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
      } else if (numArray[numArray.length - 1] === props.pageNavi.allPageNum) {
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
        pageNo = props.pageNavi.currentPageNo + 1
        break
      case ">>":
        pageNo = props.pageNavi.allPageNum
        break
      case "<":
        pageNo = props.pageNavi.currentPageNo - 1
        break
      case "<<":
        pageNo = 1
        break
      default:
        pageNo = Number(pageNoText)
    }
    // 遷移先のページ番号を設定する
    props.setNowPage(pageNo)
    // 新たに作成したページ番号配列
    const numArray: number[] = updatePageNoArray(
      Number(pageNo),
      props.pageNavi.allPageNum
    )
    setPageNoArray(numArray)
    scrollTo(0, 0)
  }

  return (
    <PageNaviArea>
      {pageNoArray.length === 0 ? (
        <></>
      ) : (
        makePageNaviStringArray(pageNoArray, props.pageNavi.allPageNum).map(
          (v, i) => {
            const p: PageNoProps = {
              bgColorHex:
                i + 1 === props.pageNavi.currentPageNo ? "e1f5fe" : "FFFFFF"
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
          }
        )
      )}
    </PageNaviArea>
  )
}

export default PageNavi
