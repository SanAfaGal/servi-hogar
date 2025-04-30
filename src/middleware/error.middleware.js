import { AppError } from '../utils/error.utils.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Default to 500 if status code is not set
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Development error response (includes stack trace)
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } 
  // Production error response (clean, no sensitive info)
  else {
    // For operational, trusted errors: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } 
    // Programming or unknown errors: don't leak error details
    else {
      console.error('ERROR 💥', err);
      
      // Send generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }
};