/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const createHikes = /* GraphQL */ `
  mutation CreateHikes(
    $input: CreateHikesInput!
    $condition: ModelHikesConditionInput
  ) {
    createHikes(input: $input, condition: $condition) {
      id
      name
      description
      image
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const updateHikes = /* GraphQL */ `
  mutation UpdateHikes(
    $input: UpdateHikesInput!
    $condition: ModelHikesConditionInput
  ) {
    updateHikes(input: $input, condition: $condition) {
      id
      name
      description
      image
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const deleteHikes = /* GraphQL */ `
  mutation DeleteHikes(
    $input: DeleteHikesInput!
    $condition: ModelHikesConditionInput
  ) {
    deleteHikes(input: $input, condition: $condition) {
      id
      name
      description
      image
      mapdata
      createdAt
      updatedAt
    }
  }
`;
