export const handleMongooseError = (error: any, data: any, next: any) => {
    error.status = 400;
    next();
};
