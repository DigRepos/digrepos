import * as React from "react"
import SearchFilter from "../index"
import { SearchFilterModel, RepositoryData } from "../../../interfaces"
import { shallow } from "enzyme"

describe("<SarchFilter />", () => {
  const searchFilter: SearchFilterModel = {
    keywords: ["Server"],
    star: {
      low: "100",
      high: "2000"
    },
    language: "Java",
    license: "MIT"
  }
  const mockFilter: SearchFilterModel = {
    keywords: [],
    star: {
      low: "",
      high: ""
    },
    language: "",
    license: ""
  }

  const mockRepoDatas: RepositoryData[] = []
  const mockUpdateSearchFilter = (filter: SearchFilterModel) => {}
  const mockUpdateRepositoryDatas = (repos: RepositoryData[]) => {}
  const mockUpdateDashboardState = (repos: RepositoryData[]) => {}
  
  it("initial rendering", () => {
    const wrapper = shallow(
      <SearchFilter
        model={mockFilter}
        updateSearchFilter={mockUpdateSearchFilter}
        updateRepositoryDatas={mockUpdateRepositoryDatas}
        updateDashboardState={mockUpdateDashboardState}
      />
    )
    expect(wrapper.exists('search-keywords'))
  })
})
