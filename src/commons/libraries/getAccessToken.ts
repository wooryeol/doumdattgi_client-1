import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphQLClient = new GraphQLClient(
      "https://doumdattgi-server.com/graphql",
      { credentials: "include" }
    );

    const result: any = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken;

    console.log("이건 토큰이요");
    console.log(newAccessToken);
    console.log("이건 토큰이요");

    return newAccessToken;
  } catch (error: any) {
    console.log("이거 에러임");
    console.log(error.message);
    console.log("에러");
  }
};
