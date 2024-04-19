const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");

// Create a new chat
exports.createChat = async (req, res) => {
  try {
    const { participants } = req.body;
    const newChat = await Chat.create({ participants });
    console.log("New chat created:", newChat);
    // Update the chatIds field in each participant's user document
    await User.updateMany(
      { _id: { $in: participants } },
      { $push: { chatIds: newChat._id } }
    );
    console.log("User documents updated with new chat ID");
    res.status(201).json({ success: true, data: newChat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Add participants to a chat
exports.addParticipantsToChat = async (req, res) => {
  try {
    const { chatId, participants } = req.body;
    await Chat.findByIdAndUpdate(chatId, {
      $push: { participants: { $each: participants } },
    });
    console.log("Participants added to chat:", participants);
    // Update the chatIds field in each new participant's user document
    await User.updateMany(
      { _id: { $in: participants } },
      { $push: { chatIds: chatId } }
    );
    console.log("User documents updated with chat ID");
    res
      .status(200)
      .json({ success: true, message: "Participants added to chat" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Send a message in a chat
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, chatId, messageContent } = req.body;
    const newMessage = await Message.create({
      sender,
      receiver,
      chatId,
      messageContent,
    });
    console.log("New message sent:", newMessage);
    // Add the new message to the chat's messages array
    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: newMessage._id },
    });
    console.log("Message added to chat");
    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get messages from a chat
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("messages");
    console.log("Messages retrieved from chat:", chat.messages);
    res.status(200).json({ success: true, data: chat.messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
