/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      like
      mapdata
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
      image
      like
      mapdata
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
      image
      like
      mapdata
      createdAt
      updatedAt
      owner
    }
  }
`;
