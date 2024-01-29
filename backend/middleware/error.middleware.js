const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.message = error.message || "Something went wrong";

  res.status(error.statusCode).json({
    success: false,
    status: error.statusCode,
    message: error.message,
  });
};

export { globalErrorHandler };
