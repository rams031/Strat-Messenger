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

const getUserAction = async ({ email, password }) => {
  return model
    .find()
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((err) => {
      return next(err);
    });
};

// User Schema / Root
const userRootActions = {
  loginUser: loginUserAction,
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
