import UserModel from '../../models/user.js'
import jwt from 'jsonwebtoken'
import userHelper from '../../helpers/user.helper.js';

import throwCustomError, {
  ErrorTypes,
} from '../../helpers/error-handler.helper.js';


const userResolver = {
    Query: { 
      getUserById: async (_, { id }, contextValue) => {
        try {
          const user = await UserModel.findById(id);
          return user;
        } catch (error) {
          throw new GraphQLError(error.message);
        }
      },
    },
  
    Mutation: {
      signup: async (_, { input }) => {
        const { name, email, password } = input;
        const isUserExists = await userHelper.isEmailAlreadyExist(email);
        
        if (isUserExists) {
          throwCustomError(
            'Email is already Registered',
            ErrorTypes.ALREADY_EXISTS
          );
        }
        const userToCreate = new UserModel({
          email: email,
          password: password,
        });
        const user = await userToCreate.save();
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_PRIVATE_KEY,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME }
        );
  
        return {
          __typename: 'UserWithToken',
          ...user._doc,
          userJwtToken: {
            token: token,
          },
        };
      },
  
      login: async (_, { input: { email, password } }, context) => {
        const user = await UserModel.findOne({
          $and: [{ email: email }, { password: password }],
        });
        if (user) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: process.env.TOKEN_EXPIRY_TIME }
          );
          return {
            ...user._doc,
            userJwtToken: {
              token: token,
            },
          };
        }
        //if user doesn't exists
        throwCustomError(
          'Invalid email or password entered.',
          ErrorTypes.BAD_USER_INPUT
        );
      },
    },
  };
  
  export default userResolver;