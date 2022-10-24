import { gql, useQuery, useMutation } from "@apollo/client";
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
      active
    }
  }
`;
export const useGetAllPeople = ({ search_value }: any) =>
  useQuery(getAllPeopleQuery, {
    variables: {
      search_value,
    },
  });

export const togglePeopleStatusById = gql`
  mutation togglePeopleStatus($id: String!) {
    togglePeopleStatus(id: $id)
  }
`;

export const useTogglePeopleStatusById = ({ search_value }: any) => {
  return useMutation(togglePeopleStatusById, {
    refetchQueries: [{ query: getAllPeopleQuery, variables: { search_value } }],
  });
};
