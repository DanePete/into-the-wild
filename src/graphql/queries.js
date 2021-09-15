/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHikes = /* GraphQL */ `
  query GetHikes($id: ID!) {
    getHikes(id: $id) {
      id
      name
      description
      city
      state
      image
      difficulty
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
        city
        state
        image
        difficulty
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
