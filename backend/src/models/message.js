const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Chat",
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Listing",
  },
  messageContent: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: () => Date.now,
  },
  messageStatus: {
    type: String,
    required: true,
    enum: ["Read", "Unread"],
  },
});

// Middleware to automatically populate 'sender', 'receiver', and 'listing' fields in find queries
messageSchema.pre(/^find/, function (next) {
  this.populate("sender");
  this.populate("receiver");
  this.populate("listing");
  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
