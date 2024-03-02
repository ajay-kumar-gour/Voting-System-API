// # Error handling middleware

// errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  // Log the stack trace for further debugging
  console.error(err.stack);

  // Check if the error is a known error type with a defined status code
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    // For unhandled errors, send a generic error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;
