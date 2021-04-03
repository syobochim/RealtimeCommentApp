/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      eventId
      username
      comment
      timestamp
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventId
        username
        comment
        timestamp
      }
      nextToken
    }
  }
`;
export const listCommentSortedByTimestamp = /* GraphQL */ `
  query ListCommentSortedByTimestamp(
    $eventId: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentSortedByTimestamp(
      eventId: $eventId
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventId
        username
        comment
        timestamp
      }
      nextToken
    }
  }
`;
