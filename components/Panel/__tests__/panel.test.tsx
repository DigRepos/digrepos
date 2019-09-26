import * as React from 'react'
import Panel from '../index'
import renderer from 'react-test-renderer'
import { RepositoryData } from '../../../interfaces'

it('Panel component', () => {
    const props: RepositoryData = {
        id: '123456',
        url: 'aaa',
        avatarUrl: 'hoge',
        fullName: 'repository full name',
        description: 'this is test render for "Panel component"',
        homepage: 'http://www.hogefuga.com/',
        owner: {
            name: 'test user',
            avatarUrl: 'test'
        },
        star: 100,
        forksCount: 120,
        watchersCount: 25,
        topics: ['panel', 'component', 'render'],
        language: 'Java',
        updatedAt: '2019/12/11 11:24:39'
    }
    const tree = renderer.create(<Panel {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
})