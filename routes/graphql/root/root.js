const { buildSchema } = require("graphql");
const {
  userRootActions,
  userSchema: { userMutation, userQuery, userTypes },
} = require("./../user/user");

const root = {
  hello: () => {
    return "Hello world!";
  },
  ...userRootActions,
};

const schema = buildSchema(`
  ${userTypes},
 
  type Query {
    hello: String,
    ${userQuery},
  }
  type Mutation {
    ${userMutation},
  }
`);

module.exports = { root, schema };
