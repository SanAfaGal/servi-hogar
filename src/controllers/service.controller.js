import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/error.utils.js';

/**
 * Create a new service
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const createService = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Insert service into database
    const { data: newService, error } = await supabase
      .from('services')
      .insert({ name, description })
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return next(new AppError('Service with this name already exists', 409));
      }
      return next(new AppError('Failed to create service', 500));
    }

    res.status(201).json({
      status: 'success',
      message: 'Service created successfully',
      data: {
        service: {
          id: newService.id,
          name: newService.name,
          description: newService.description,
          createdAt: newService.created_at,
          updatedAt: newService.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Service creation error:', error);
    next(new AppError('Internal server error', 500));
  }
};

/**
 * Get all services
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAllServices = async (req, res, next) => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('name');

    if (error) {
      return next(new AppError('Failed to retrieve services', 500));
    }

    const formattedServices = services.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      createdAt: service.created_at,
      updatedAt: service.updated_at
    }));

    res.status(200).json({
      status: 'success',
      data: {
        services: formattedServices
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    next(new AppError('Internal server error', 500));
  }
};

/**
 * Get service by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: service, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return next(new AppError('Failed to retrieve service', 500));
    }

    if (!service) {
      return next(new AppError('Service not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
          createdAt: service.created_at,
          updatedAt: service.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Get service error:', error);
    next(new AppError('Internal server error', 500));
  }
};

/**
 * Update service by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if service exists
    const { data: existingService, error: fetchError } = await supabase
      .from('services')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError || !existingService) {
      return next(new AppError('Service not found', 404));
    }

    // Update service
    const { data: updatedService, error: updateError } = await supabase
      .from('services')
      .update({ name, description })
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      if (updateError.code === '23505') { // Unique violation
        return next(new AppError('Service with this name already exists', 409));
      }
      return next(new AppError('Failed to update service', 500));
    }

    res.status(200).json({
      status: 'success',
      message: 'Service updated successfully',
      data: {
        service: {
          id: updatedService.id,
          name: updatedService.name,
          description: updatedService.description,
          createdAt: updatedService.created_at,
          updatedAt: updatedService.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Update service error:', error);
    next(new AppError('Internal server error', 500));
  }
};