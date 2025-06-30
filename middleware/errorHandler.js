const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err.status) {
    res.status(err.status).json({
      message: err.message || "An error occurred",
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message || "An unexpected error occurred",
    });
  }
};

export default errorHandler;
