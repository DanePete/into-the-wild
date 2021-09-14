/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHikes = /* GraphQL */ `
  query GetHikes($id: ID!) {
    getHikes(id: $id) {
      id
      name
      description
      image
      like
      mapdata
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listHikes = /* GraphQL */ `
  query ListHikes(
    $filter: ModelHikesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        like
        mapdata
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchHikes = /* GraphQL */ `
  query SearchHikes(
    $filter: SearchableHikesFilterInput
    $sort: SearchableHikesSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchHikes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        name
        description
        image
        like
        mapdata
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
    }
  }
`;
