import gql from 'graphql-tag';

export const typeHealthCheck = gql`
type Query {
  healthCheck: String
}
`;