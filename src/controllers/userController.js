import { StatusCodes } from 'http-status-codes'; 
import { signUpService, signInService } from '../services/userService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js'; 

// Async controller for user sign up
export const signUp = async (req, res) => {
  try {
    const user = await signUpService(req.body); // Signup service call with request body

    // If successful, return 201 with success message
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User created successfully'));
  } catch (error) {
    console.log('User controller error', error);

    // If error has a statusCode, return that code and custom error response
    if (error.statusCode) {
      return res
        .status(error.statusCode)
        .json(customErrorResponse(error));
    }

    // Otherwise return 500 internal server error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const signIn = async (req, res) => {
  try {
    const response = await signInService(req.body);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User signed in successfully'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
