/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateHikes = /* GraphQL */ `
  subscription OnCreateHikes {
    onCreateHikes {
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
export const onUpdateHikes = /* GraphQL */ `
  subscription OnUpdateHikes {
    onUpdateHikes {
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
export const onDeleteHikes = /* GraphQL */ `
  subscription OnDeleteHikes {
    onDeleteHikes {
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
