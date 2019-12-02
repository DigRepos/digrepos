import * as React from "react"
import { shallow } from "enzyme"
import PageNavi from "../index"
import { PageNaviState } from "../../../interfaces"

type PageNaviProps = {
  pageNavi: PageNaviState
  setNowPage: (n: number) => void
}

const createPageNavi = (props: PageNaviProps) => <PageNavi {...props} />

describe("<PageNavi />", () => {
  it("The number of pages is 4 that's all", () => {
    const props = {
      pageNavi: {
        currentPageNo: 1,
        allPageNum: 10
      },
      setNowPage: (n: number) => {}
    }
    const nextPageNum = 2
    const wrapper = shallow(createPageNavi(props))
    expect(wrapper.find(".page-no").length).toBe(4 + nextPageNum)
  })

  it("The number of pages is just 3", () => {
    const props = {
      pageNavi: {
        currentPageNo: 1,
        allPageNum: 3
      },
      setNowPage: (n: number) => {}
    }
    const wrapper = shallow(createPageNavi(props))
    expect(wrapper.find(".page-no").length).toBe(3)
  })

  it("The number of pages is 0", () => {
    const props = {
      pageNavi: {
        currentPageNo: 1,
        allPageNum: 0
      },
      setNowPage: (n: number) => {}
    }

    const wrapper = shallow(createPageNavi(props))
    expect(wrapper.find(".page-no").length).toBe(0)
  })

  it("simulate click", () => {
    const props = {
      pageNavi: {
        currentPageNo: 1,
        allPageNum: 10
      },
      setNowPage: (n: number) => {}
    }
    const wrapper = shallow(createPageNavi(props))
    globalThis.scrollTo = jest.fn()
    expect(
      wrapper
        .find(".page-no")
        .at(1)
        .simulate("click", { currentTarget: { innerText: "2" } })
        .hasClass("page-no")
    )
  })
})
