const Message = require("../models/message");

const MessageController = {
  // Create a new message
  createMessage: async (req, res) => {
    try {
      console.log("Creating message:", req.body);
      const message = new Message(req.body);
      await message.save();
      console.log("Message created:", message);
      res
        .status(201)
        .json({ message: "Message created successfully", data: message });
    } catch (error) {
      console.error("Error creating message:", error);
      res
        .status(500)
        .json({ message: "Error creating message", error: error.message });
    }
  },

  // Get all messages
  getAllMessages: async (req, res) => {
    try {
      console.log("Fetching all messages");
      const messages = await Message.find();
      console.log("Fetched messages:", messages);
      res.status(200).json({ data: messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res
        .status(500)
        .json({ message: "Error fetching messages", error: error.message });
    }
  },

  // Get a message by ID
  getMessageById: async (req, res) => {
    try {
      console.log("Fetching message by ID:", req.params.id);
      const message = await Message.findById(req.params.id);
      console.log("Fetched message:", message);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json({ data: message });
    } catch (error) {
      console.error("Error fetching message:", error);
      res
        .status(500)
        .json({ message: "Error fetching message", error: error.message });
    }
  },

  // Update a message by ID
  updateMessageById: async (req, res) => {
    try {
      console.log(
        "Updating message by ID:",
        req.params.id,
        "with data:",
        req.body
      );
      const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      console.log("Updated message:", message);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res
        .status(200)
        .json({ message: "Message updated successfully", data: message });
    } catch (error) {
      console.error("Error updating message:", error);
      res
        .status(500)
        .json({ message: "Error updating message", error: error.message });
    }
  },

  // Delete a message by ID
  deleteMessageById: async (req, res) => {
    try {
      console.log("Deleting message by ID:", req.params.id);
      const message = await Message.findByIdAndDelete(req.params.id);
      console.log("Deleted message:", message);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      res
        .status(500)
        .json({ message: "Error deleting message", error: error.message });
    }
  },
};

module.exports = MessageController;
