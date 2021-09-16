/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      handle
      displayName
      photoUrl
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        handle
        displayName
        photoUrl
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
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
