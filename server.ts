// @ts-ignore
import { Server } from "https://deno.land/std@0.166.0/http/server.ts";
// @ts-ignore
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
// @ts-ignore
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
// @ts-ignore
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

const PORT = 4444;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => `Hello, GraphGL!`,
  },
};

const schema = makeExecutableSchema({ resolvers, typeDefs });

const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
        schema,
        graphiql: true,
      })(req)
      : new Response("Not Found", { status: 404 });
  },
  port: PORT,
});

server.listenAndServe();
