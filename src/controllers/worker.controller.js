import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/error.utils.js';

/**
 * Register a new worker
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const registerWorker = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      firstLastName,
      secondLastName,
      identificationType,
      identificationNumber,
      phoneNumber,
      email,
      city,
      neighborhood,
      fullAddress,
      yearsOfExperience,
      description,
      availability = true,
      websiteUrl,
    } = req.body;

    // Process uploaded files
    const profilePicture = req.files?.profilePicture?.[0];
    const certificationFiles = req.files?.certifications || [];

    // Check for duplicate identification number
    const { data: existingWorker, error: checkError } = await supabase
      .from('workers')
      .select('id')
      .eq('identification_number', identificationNumber)
      .maybeSingle();

    if (checkError) {
      return next(new AppError('Database query error', 500));
    }

    if (existingWorker) {
      return next(
        new AppError('Worker with this identification number already exists', 409)
      );
    }

    // Format certifications data if provided
    const certifications = certificationFiles.map((file) => ({
      name: file.originalname.split('.')[0],
      url: `/uploads/${file.filename}`,
    }));

    // Insert worker data into Supabase
    const { data: newWorker, error } = await supabase.from('workers').insert({
      first_name: firstName,
      middle_name: middleName || null,
      first_last_name: firstLastName,
      second_last_name: secondLastName || null,
      identification_type: identificationType,
      identification_number: identificationNumber,
      phone_number: phoneNumber,
      email,
      city,
      neighborhood: neighborhood || null,
      full_address: fullAddress,
      years_of_experience: yearsOfExperience,
      description,
      profile_picture: profilePicture ? `/uploads/${profilePicture.filename}` : null,
      availability,
      website_url: websiteUrl || null,
      certifications: certifications.length > 0 ? certifications : null,
    }).select('*').single();

    if (error) {
      console.error('Worker registration error:', error);
      return next(new AppError('Failed to register worker', 500));
    }

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Worker registered successfully',
      data: {
        worker: {
          id: newWorker.id,
          firstName: newWorker.first_name,
          middleName: newWorker.middle_name,
          firstLastName: newWorker.first_last_name,
          secondLastName: newWorker.second_last_name,
          identificationType: newWorker.identification_type,
          identificationNumber: newWorker.identification_number,
          phoneNumber: newWorker.phone_number,
          email: newWorker.email,
          city: newWorker.city,
          neighborhood: newWorker.neighborhood,
          fullAddress: newWorker.full_address,
          yearsOfExperience: newWorker.years_of_experience,
          description: newWorker.description,
          profilePicture: newWorker.profile_picture,
          availability: newWorker.availability,
          websiteUrl: newWorker.website_url,
          certifications: newWorker.certifications,
          createdAt: newWorker.created_at,
        },
      },
    });
  } catch (error) {
    console.error('Worker registration error:', error);
    next(new AppError('Internal server error', 500));
  }
};

/**
 * Get worker by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getWorkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Verify the worker exists and belongs to the authenticated user
    const { data: worker, error } = await supabase
      .from('workers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return next(new AppError('Failed to retrieve worker data', 500));
    }

    if (!worker) {
      return next(new AppError('Worker not found', 404));
    }

    // Check if the authenticated user is the owner of this profile
    if (req.user.email !== worker.email) {
      return next(new AppError('Unauthorized access to worker profile', 403));
    }

    // Transform data for response
    const formattedWorker = {
      id: worker.id,
      firstName: worker.first_name,
      middleName: worker.middle_name,
      firstLastName: worker.first_last_name,
      secondLastName: worker.second_last_name,
      identificationType: worker.identification_type,
      identificationNumber: worker.identification_number,
      phoneNumber: worker.phone_number,
      email: worker.email,
      city: worker.city,
      neighborhood: worker.neighborhood,
      fullAddress: worker.full_address,
      yearsOfExperience: worker.years_of_experience,
      description: worker.description,
      profilePicture: worker.profile_picture,
      availability: worker.availability,
      websiteUrl: worker.website_url,
      certifications: worker.certifications,
      createdAt: worker.created_at,
      updatedAt: worker.updated_at,
    };

    res.status(200).json({
      status: 'success',
      data: {
        worker: formattedWorker,
      },
    });
  } catch (error) {
    console.error('Get worker error:', error);
    next(new AppError('Internal server error', 500));
  }
};

/**
 * Update worker by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateWorkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Verify the worker exists
    const { data: existingWorker, error: fetchError } = await supabase
      .from('workers')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      return next(new AppError('Failed to retrieve worker data', 500));
    }

    if (!existingWorker) {
      return next(new AppError('Worker not found', 404));
    }

    // Check if the authenticated user is the owner of this profile
    if (req.user.email !== existingWorker.email) {
      return next(new AppError('Unauthorized access to worker profile', 403));
    }

    // Get updateable fields from request body
    const {
      phoneNumber,
      city,
      neighborhood,
      fullAddress,
      yearsOfExperience,
      description,
      availability,
      websiteUrl,
    } = req.body;

    // Process uploaded files if any
    const profilePicture = req.files?.profilePicture?.[0];
    const certificationFiles = req.files?.certifications || [];

    // Prepare update data
    const updateData = {
      phone_number: phoneNumber || existingWorker.phone_number,
      city: city || existingWorker.city,
      neighborhood: neighborhood !== undefined ? neighborhood : existingWorker.neighborhood,
      full_address: fullAddress || existingWorker.full_address,
      years_of_experience: yearsOfExperience || existingWorker.years_of_experience,
      description: description || existingWorker.description,
      availability: availability !== undefined ? availability : existingWorker.availability,
      website_url: websiteUrl !== undefined ? websiteUrl : existingWorker.website_url,
      updated_at: new Date(),
    };

    // Update profile picture if provided
    if (profilePicture) {
      updateData.profile_picture = `/uploads/${profilePicture.filename}`;
    }

    // Update certifications if provided
    if (certificationFiles.length > 0) {
      const newCertifications = certificationFiles.map((file) => ({
        name: file.originalname.split('.')[0],
        url: `/uploads/${file.filename}`,
      }));
      
      // Merge with existing certifications if any
      updateData.certifications = [
        ...(existingWorker.certifications || []),
        ...newCertifications,
      ];
    }

    // Update worker in database
    const { data: updatedWorker, error: updateError } = await supabase
      .from('workers')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      return next(new AppError('Failed to update worker profile', 500));
    }

    // Transform data for response
    const formattedWorker = {
      id: updatedWorker.id,
      firstName: updatedWorker.first_name,
      middleName: updatedWorker.middle_name,
      firstLastName: updatedWorker.first_last_name,
      secondLastName: updatedWorker.second_last_name,
      identificationType: updatedWorker.identification_type,
      identificationNumber: updatedWorker.identification_number,
      phoneNumber: updatedWorker.phone_number,
      email: updatedWorker.email,
      city: updatedWorker.city,
      neighborhood: updatedWorker.neighborhood,
      fullAddress: updatedWorker.full_address,
      yearsOfExperience: updatedWorker.years_of_experience,
      description: updatedWorker.description,
      profilePicture: updatedWorker.profile_picture,
      availability: updatedWorker.availability,
      websiteUrl: updatedWorker.website_url,
      certifications: updatedWorker.certifications,
      createdAt: updatedWorker.created_at,
      updatedAt: updatedWorker.updated_at,
    };

    res.status(200).json({
      status: 'success',
      message: 'Worker profile updated successfully',
      data: {
        worker: formattedWorker,
      },
    });
  } catch (error) {
    console.error('Update worker error:', error);
    next(new AppError('Internal server error', 500));
  }
};