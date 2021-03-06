/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createHikes = /* GraphQL */ `
  mutation CreateHikes(
    $input: CreateHikesInput!
    $condition: ModelHikesConditionInput
  ) {
    createHikes(input: $input, condition: $condition) {
      id
      name
      description
      city
      state
      image
      difficulty
      like
      mapdata
      comments {
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      city
      state
      image
      difficulty
      like
      mapdata
      comments {
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      city
      state
      image
      difficulty
      like
      mapdata
      comments {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      hikeId
      content
      createdAt
      updatedAt
      hike {
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
      owner
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      hikeId
      content
      createdAt
      updatedAt
      hike {
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
      owner
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      hikeId
      content
      createdAt
      updatedAt
      hike {
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
      owner
    }
  }
`;
