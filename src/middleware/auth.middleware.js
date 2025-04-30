import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/error.utils.js';

/**
 * Authenticate user middleware
 * Checks if the user is authenticated via Supabase auth
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Authentication token is missing', 401));
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return next(new AppError('Authentication token is invalid', 401));
    }
    
    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return next(new AppError('Authentication failed: ' + (error?.message || 'Invalid token'), 401));
    }
    
    // Set user data to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role || 'worker'
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(new AppError('Authentication failed', 401));
  }
};

/**
 * Check if user is admin middleware
 */
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Access denied. Admin privileges required.', 403));
  }
  next();
};