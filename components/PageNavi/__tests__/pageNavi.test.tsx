import * as React from 'react'
import { shallow } from 'enzyme'
import PageNavi from '../index'

describe('<PageNavi />', () => {
    it('Initialize component', () => {
        const props = {
            pageNum: 3,
            nowPage: 1,
            setNowPage: (n: number) => {}
        }
        const wrapper = shallow(<PageNavi {...props} />)
        expect(wrapper.find('.page-no').length).toBe(3)

    })
})