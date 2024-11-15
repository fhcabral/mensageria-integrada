import { HttpException, HttpStatus } from "@nestjs/common";
import { MessagesHelper } from "src/helpers/messages.helper";

export const genericExceptionError = (error: any) => {
    throw new HttpException(
        {
          status: error.status,
          message: error.message,
          error: MessagesHelper.INTERNAL_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
}