const express = require("express");
const router = express.Router();
const { jwtCheck, jwtParse } = require("../middleware/auth");
const chatController = require("../controllers/chatController");

// Route to create a new chat
router.post("/chat", jwtCheck, jwtParse, chatController.createChat);

// Route to add participants to a chat
router.put(
  "/chat/addParticipants",
  jwtCheck,
  jwtParse,
  chatController.addParticipantsToChat
);

// Route to send a message in a chat
router.post(
  "/chat/sendMessage",
  jwtCheck,
  jwtParse,
  chatController.sendMessage
);

// Route to get messages from a chat
router.get(
  "/chat/:chatId/messages",
  jwtCheck,
  jwtParse,
  chatController.getMessages
);

module.exports = router;
