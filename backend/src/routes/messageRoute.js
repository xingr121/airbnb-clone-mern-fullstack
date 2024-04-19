const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");
const { jwtCheck, jwtParse } = require("../middleware/auth");

// Create a new message
router.post("/", jwtCheck, jwtParse, messageController.createMessage);

// Get all messages
router.get("/", jwtCheck, jwtParse, messageController.getAllMessages);

// Get a message by ID
router.get("/:id", jwtCheck, jwtParse, messageController.getMessageById);

// Update a message by ID
router.put("/:id", jwtCheck, jwtParse, messageController.updateMessageById);

// Delete a message by ID
router.delete("/:id", jwtCheck, jwtParse, messageController.deleteMessageById);

module.exports = router;
