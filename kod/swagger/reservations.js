/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Operations related to reservations
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of all reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   member_id:
 *                     type: integer
 *                   session_id:
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
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - member_id
 *               - session_id
 *             properties:
 *               member_id:
 *                 type: integer
 *               session_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Reservation already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Cancel a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reservation ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
