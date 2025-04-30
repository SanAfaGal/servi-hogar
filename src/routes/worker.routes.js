import express from 'express';
import { 
  registerWorker, 
  getWorkerById, 
  updateWorkerById 
} from '../controllers/worker.controller.js';
import { 
  registerValidation, 
  updateValidation, 
  validateRequest 
} from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - Workers
 *     summary: Register a new worker
 *     description: Register a new worker with their profile information and optional documents
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - firstLastName
 *               - identificationType
 *               - identificationNumber
 *               - phoneNumber
 *               - email
 *               - city
 *               - fullAddress
 *               - yearsOfExperience
 *               - description
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Worker's first name
 *               middleName:
 *                 type: string
 *                 description: Worker's middle name (optional)
 *               firstLastName:
 *                 type: string
 *                 description: Worker's first last name
 *               secondLastName:
 *                 type: string
 *                 description: Worker's second last name (optional)
 *               identificationType:
 *                 type: string
 *                 enum: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte']
 *               identificationNumber:
 *                 type: string
 *                 description: Worker's identification number
 *               phoneNumber:
 *                 type: string
 *                 description: Worker's phone number
 *               email:
 *                 type: string
 *                 format: email
 *               city:
 *                 type: string
 *                 enum: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Copacabana', 'Girardota', 'Barbosa', 'Caldas']
 *               neighborhood:
 *                 type: string
 *                 description: Worker's neighborhood (optional)
 *               fullAddress:
 *                 type: string
 *                 description: Worker's full address
 *               yearsOfExperience:
 *                 type: string
 *                 enum: ['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años']
 *               description:
 *                 type: string
 *                 description: Worker's professional description
 *               availability:
 *                 type: boolean
 *                 default: true
 *               websiteUrl:
 *                 type: string
 *                 format: uri
 *                 description: Worker's website URL (optional)
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Worker's profile picture (optional)
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Worker's certification documents (optional)
 *     responses:
 *       201:
 *         description: Worker registered successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Worker already exists
 *       500:
 *         description: Server error
 */
router.post(
  '/register',
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'certifications', maxCount: 5 }
  ]),
  registerValidation,
  validateRequest,
  registerWorker
);

/**
 * @openapi
 * /api/workers/{id}:
 *   get:
 *     tags:
 *       - Workers
 *     summary: Get worker profile
 *     description: Retrieve a worker's profile by their ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Worker's UUID
 *     responses:
 *       200:
 *         description: Worker profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Server error
 *   put:
 *     tags:
 *       - Workers
 *     summary: Update worker profile
 *     description: Update a worker's profile information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Worker's UUID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               city:
 *                 type: string
 *                 enum: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Copacabana', 'Girardota', 'Barbosa', 'Caldas']
 *               neighborhood:
 *                 type: string
 *               fullAddress:
 *                 type: string
 *               yearsOfExperience:
 *                 type: string
 *                 enum: ['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años']
 *               description:
 *                 type: string
 *               availability:
 *                 type: boolean
 *               websiteUrl:
 *                 type: string
 *                 format: uri
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               certifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Worker profile updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Server error
 */
router.get('/workers/:id', authenticate, getWorkerById);
router.put(
  '/workers/:id',
  authenticate,
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'certifications', maxCount: 5 }
  ]),
  updateValidation,
  validateRequest,
  updateWorkerById
);

export default router;