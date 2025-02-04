/**
 * @swagger
 * tags:
 *   name: Trainers
 *   description: Operations related to trainers
 */

/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Get all trainers
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: List of all trainers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainers:
 *   post:
 *     summary: Create a new trainer
 *     tags: [Trainers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Trainer created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainers/{id}:
 *   get:
 *     summary: Get trainer details by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Trainer ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trainer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Trainer not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainers/{id}:
 *   put:
 *     summary: Update trainer details by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Trainer ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trainer updated successfully
 *       404:
 *         description: Trainer not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainers/{id}:
 *   delete:
 *     summary: Delete trainer by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Trainer ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Trainer deleted successfully
 *       404:
 *         description: Trainer not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
