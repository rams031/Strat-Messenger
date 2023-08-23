const UserModel = require("./../../../model/user/user");
const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  return jwt.sign(data, "secret", {
    expiresIn: "20d", // expires in 365 days
  });
};

const loginUserAction = async ({ email, password }) => {
  return await UserModel.find({ email }).then((result) => {
    if (result && password === result[0].password) {
      const token = generateAccessToken({ ...result[0] });

      console.log(typeof result);
      console.log(`result:`, result);

      // const data = {
      //   // data: result,
      //   // token: token,
      //   message: "Successfully Logged In",
      //   // status: 201,
      // };

      return { message: "Successfully Logged In", status: 201, result };
    }

    return {
      message: "Invalid Credential",
      status: 422,
    };
  });
};

const getUserDataAction = async () => {
  return model
    .find()
    .then((response) => {
      console.log(`response:`, response);

      return {
        message: "fetched",
        status: 200,
      };
    })
    .catch((err) => {
      return {
        message: "fetched",
        status: 400,
      };
    });
};

// User Schema / Root
const userRootActions = {
  loginUser: loginUserAction,
  getUserData: getUserDataAction
};

const userSchema = {
  userMutation: `
    loginUser(email: String!,password: String!): loginResponse
  `,
  userQuery: ``,
  userTypes: `
    type loginResponse {
      id: Int!,
      username: String!,
      password: String!,
      status: Int!,
      message: String
      result: [userLoginDataResponse]!
    },
    type userLoginDataResponse {
      _id: ID,
      email: String,
      password: String,
      createdAt: String,
      updatedAt: String,
    },
  `,
};

module.exports = { loginUserAction, userRootActions, userSchema };
