/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      mapdata
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHikes = /* GraphQL */ `
  subscription OnCreateHikes($owner: String) {
    onCreateHikes(owner: $owner) {
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
export const onUpdateHikes = /* GraphQL */ `
  subscription OnUpdateHikes($owner: String) {
    onUpdateHikes(owner: $owner) {
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
export const onDeleteHikes = /* GraphQL */ `
  subscription OnDeleteHikes($owner: String) {
    onDeleteHikes(owner: $owner) {
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
