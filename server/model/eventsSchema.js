const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: timestamp,
    required: true,
  },
  coordinator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Events = mongoose.model("EVENTS", eventsSchema);
module.exports = Events;
