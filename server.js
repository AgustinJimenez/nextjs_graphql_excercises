const fs = require("fs");
const express = require("express");
const app = express();
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require("cors");
const port = 8080;

const getPeople = () => JSON.parse(fs.readFileSync("people.json"));
const setPeople = (newPeople) => {
  let newPeopleStr = JSON.stringify(newPeople);
  fs.writeFileSync("people.json", newPeopleStr);
};

const arrToStr = (info = []) =>
  info.map((str) => str.toLocaleLowerCase()).join(" ");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        people(search_value: String): [People]
    },
    type Mutation {
      togglePeopleStatus(id: String): Boolean
    },
    type People {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        country: String
        modified: String
        vip: Boolean
        active: Boolean
    }
`);

// Root resolver
var root = {
  togglePeopleStatus: (params) => {
    let people = getPeople();
    const person = people.find((p) => String(p.id) === params.id);
    if (!person) return false;

    people = people.map((p) => {
      if (p.id === person.id) p.active = !p.active;

      return p;
    });

    setPeople(people);

    return true;
  },
  people: (params) => {
    let people = getPeople();
    if (params.search_value)
      people = people.filter((p) =>
        arrToStr([p.last_name, p.first_name, p.email]).match(
          params.search_value.toLocaleLowerCase()
        )
      );

    people.sort((a, b) =>
      arrToStr([a.last_name, a.first_name, a.email]).localeCompare(
        arrToStr([b.last_name, b.first_name, b.email])
      )
    );
    return people;
  },
};
app.use(cors());
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
