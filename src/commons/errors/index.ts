import { HttpException, HttpStatus } from '@nestjs/common';

interface ErrorCode {
    code: string;
    message: string;
}

export const ErrorCodes = {
  USER_EXISTS: {
    code: 'USER_EXISTS',
    message: 'User is exist',
  },
  WRONG_PASSWORD: {
    code: 'WRONG_PASSWORD',
    message: 'Wrong username or password',
  },

};

export class UserInputError extends HttpException {
  constructor(error: ErrorCode) {
    super(error.message, HttpStatus.FORBIDDEN);
  }
}
