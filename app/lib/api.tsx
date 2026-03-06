import { GraphQLClient, gql } from "graphql-request";
const client = new GraphQLClient(process.env.WORDPRESS_API_URL as string);
export async function graphqlFetch(query: string, variables = {}) {
  const data = await client.request(query, variables);
  return data;
}
// Example Query
export const GET_ALL_POSTS = gql`
  query GetPosts {
    posts(first: 10) {
      nodes {
        title
        slug
        excerpt
        date
      }
    }
  }
`;
