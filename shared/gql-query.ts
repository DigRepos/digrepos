import gql from 'graphql-tag'

export const SEARCH_REPOSITORY = gql`
  query SaerchRepository($query: String!) {
    search(query: $query, type: "REPOSITORY") {
      repositoryCount
      nodes {
        id
        url
        openGraphImageUrl
        nameWithOwner
        description
        homepageUrl
        primaryLanguage {
          name
        }
        owner {
          avatarUrl
          name
        }
        stargazers {
          totalCount
        }
        forkCount
        watchers {
          totalCount
        }
        repositoryTopics {
          nodes {
            topic {
              name
            }
          }
        }
        updatedAt
      }
    }
  }
`