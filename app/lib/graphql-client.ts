import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;
export const client = new GraphQLClient(endpoint);
