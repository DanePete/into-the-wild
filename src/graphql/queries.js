/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        mapdata
        createdAt
        updatedAt
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
      image
      like
      mapdata
      createdAt
      updatedAt
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
      }
      nextToken
    }
  }
`;
