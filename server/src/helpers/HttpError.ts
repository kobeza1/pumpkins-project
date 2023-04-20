import { STATUS_CODES } from "http";

const HttpError = (status: number, message: string) => {
    const error: any = new Error(message);
    error.status = status;
    return error;
};

module.exports = HttpError;
