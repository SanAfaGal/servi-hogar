import express from 'express';
import { 
  createService,
  getAllServices,
  getServiceById,
  updateService
} from '../controllers/service.controller.js';
import { 
  createServiceValidation,
  updateServiceValidation,
  validateRequest 
} from '../middleware/validation.middleware.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/services:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get all services
 *     description: Retrieve a list of all available services
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       500:
 *         description: Server error
 *   post:
 *     tags:
 *       - Services
 *     summary: Create a new service
 *     description: Create a new service (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       409:
 *         description: Service already exists
 *       500:
 *         description: Server error
 */
router.get('/services', getAllServices);
router.post(
  '/services',
  authenticate,
  isAdmin,
  createServiceValidation,
  validateRequest,
  createService
);

/**
 * @openapi
 * /api/services/{id}:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get service by ID
 *     description: Retrieve a service by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Service UUID
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 *   put:
 *     tags:
 *       - Services
 *     summary: Update service
 *     description: Update a service by its ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Service UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Service not found
 *       409:
 *         description: Service name already exists
 *       500:
 *         description: Server error
 */
router.get('/services/:id', getServiceById);
router.put(
  '/services/:id',
  authenticate,
  isAdmin,
  updateServiceValidation,
  validateRequest,
  updateService
);

export default router;