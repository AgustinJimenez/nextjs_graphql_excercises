import { gql, useQuery } from "@apollo/client";
import { ApolloClient } from "../../src/providers/ApolloClientProvider";

export const getAllPeopleQuery = gql`
  query GetPeople($search_value: String!) {
    people(search_value: $search_value) {
      id
      first_name
      last_name
      email
      country
      vip
      modified
    }
  }
`;
export const useGetAllPeople = () => useQuery(getAllPeopleQuery);

export const getAllPeopleApi = async ({ search_value }: any) =>
  await ApolloClient.query({
    query: getAllPeopleQuery,
    variables: {
      search_value,
    },
  });
