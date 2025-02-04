/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Operations related to sessions
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Get all sessions
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: List of all sessions
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
 *                   date_time:
 *                     type: string
 *                     format: date-time
 *                   capacity:
 *                     type: integer
 *                   trainer_id:
 *                     type: integer
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
 * /sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date_time
 *               - capacity
 *               - trainer_id
 *             properties:
 *               name:
 *                 type: string
 *               date_time:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *               trainer_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Session created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Get session details by ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Session details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 date_time:
 *                   type: string
 *                   format: date-time
 *                 capacity:
 *                   type: integer
 *                 trainer_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Session not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sessions/{id}:
 *   put:
 *     summary: Update session details by ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session ID
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
 *               date_time:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Session updated successfully
 *       404:
 *         description: Session not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Delete session by ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Session deleted successfully
 *       404:
 *         description: Session not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
