import { body, param, validationResult } from 'express-validator';

// Validation for service creation
export const createServiceValidation = [
  body('name')
    .notEmpty().withMessage('Service name is required')
    .isString().withMessage('Service name must be a string')
    .isLength({ max: 100 }).withMessage('Service name must be less than 100 characters'),
    
  body('description')
    .notEmpty().withMessage('Service description is required')
    .isString().withMessage('Service description must be a string')
    .isLength({ max: 500 }).withMessage('Service description must be less than 500 characters'),
];

// Validation for service update
export const updateServiceValidation = [
  param('id')
    .notEmpty().withMessage('Service ID is required')
    .isUUID().withMessage('Invalid service ID format'),
    
  body('name')
    .notEmpty().withMessage('Service name is required')
    .isString().withMessage('Service name must be a string')
    .isLength({ max: 100 }).withMessage('Service name must be less than 100 characters'),
    
  body('description')
    .notEmpty().withMessage('Service description is required')
    .isString().withMessage('Service description must be a string')
    .isLength({ max: 500 }).withMessage('Service description must be less than 500 characters'),
];

// Validation for worker registration
export const registerValidation = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isString().withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
    
  body('middleName')
    .optional()
    .isString().withMessage('Middle name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('Middle name must be between 2 and 50 characters'),
    
  body('firstLastName')
    .notEmpty().withMessage('First last name is required')
    .isString().withMessage('First last name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('First last name must be between 2 and 50 characters'),
    
  body('secondLastName')
    .optional()
    .isString().withMessage('Second last name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('Second last name must be between 2 and 50 characters'),
    
  body('identificationType')
    .notEmpty().withMessage('Identification type is required')
    .isIn(['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte'])
    .withMessage('Invalid identification type'),
    
  body('identificationNumber')
    .notEmpty().withMessage('Identification number is required')
    .isString().withMessage('Identification number must be a string')
    .isLength({ min: 5, max: 20 }).withMessage('Identification number must be between 5 and 20 characters'),
    
  body('phoneNumber')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9+\-\s]+$/).withMessage('Phone number can only contain numbers, +, -, and spaces')
    .isLength({ min: 7, max: 15 }).withMessage('Phone number must be between 7 and 15 characters'),
    
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),
    
  body('city')
    .notEmpty().withMessage('City is required')
    .isIn(['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Copacabana', 'Girardota', 'Barbosa', 'Caldas'])
    .withMessage('Invalid city'),
    
  body('neighborhood')
    .optional()
    .isString().withMessage('Neighborhood must be a string')
    .isLength({ max: 100 }).withMessage('Neighborhood must be less than 100 characters'),
    
  body('fullAddress')
    .notEmpty().withMessage('Full address is required')
    .isString().withMessage('Full address must be a string')
    .isLength({ min: 5, max: 200 }).withMessage('Full address must be between 5 and 200 characters'),
    
  body('yearsOfExperience')
    .notEmpty().withMessage('Years of experience is required')
    .isIn(['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años'])
    .withMessage('Invalid years of experience'),
    
  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
    
  body('availability')
    .optional()
    .isBoolean().withMessage('Availability must be a boolean'),
    
  body('websiteUrl')
    .optional()
    .isURL().withMessage('Website URL must be a valid URL'),
];

// Validation for worker profile update
export const updateValidation = [
  param('id')
    .notEmpty().withMessage('Worker ID is required')
    .isUUID().withMessage('Invalid worker ID format'),
    
  body('phoneNumber')
    .optional()
    .matches(/^[0-9+\-\s]+$/).withMessage('Phone number can only contain numbers, +, -, and spaces')
    .isLength({ min: 7, max: 15 }).withMessage('Phone number must be between 7 and 15 characters'),
    
  body('city')
    .optional()
    .isIn(['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Copacabana', 'Girardota', 'Barbosa', 'Caldas'])
    .withMessage('Invalid city'),
    
  body('neighborhood')
    .optional()
    .isString().withMessage('Neighborhood must be a string')
    .isLength({ max: 100 }).withMessage('Neighborhood must be less than 100 characters'),
    
  body('fullAddress')
    .optional()
    .isString().withMessage('Full address must be a string')
    .isLength({ min: 5, max: 200 }).withMessage('Full address must be between 5 and 200 characters'),
    
  body('yearsOfExperience')
    .optional()
    .isIn(['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años'])
    .withMessage('Invalid years of experience'),
    
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
    
  body('availability')
    .optional()
    .isBoolean().withMessage('Availability must be a boolean'),
    
  body('websiteUrl')
    .optional()
    .isURL().withMessage('Website URL must be a valid URL'),
];

// Middleware to check validation results
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: formattedErrors
    });
  }
  next();
};