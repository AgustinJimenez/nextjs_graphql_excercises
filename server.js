const fs = require("fs");
const express = require("express");
const app = express();
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const port = 8080;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        people(search_value: String): [People]
    },
    type People {
        id: Int
        first_name: String
        last_name: String
        email: String
        country: String
        modified: String
        vip: Boolean
    }
`);

// Root resolver
var root = {
  people: (params) => {
    let peopleRaw = fs.readFileSync("people.json");
    let people = JSON.parse(peopleRaw);
    if (params.search_value)
      people = people.filter((p) =>
        `${p.last_name.toLocaleLowerCase()} ${p.first_name.toLocaleLowerCase()}`.match(
          params.search_value.toLocaleLowerCase()
        )
      );

    people.sort((a, b) =>
      `${a.last_name.toLocaleLowerCase()} ${a.first_name.toLocaleLowerCase()}`.localeCompare(
        `${b.first_name.toLocaleLowerCase()} ${b.first_name.toLocaleLowerCase()}`
      )
    );

    console.log("params ===>", params);
    return people;
  },
};

app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
