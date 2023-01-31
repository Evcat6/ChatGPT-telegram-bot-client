const express = require("express");
const { Bot, webhookCallback } = require("grammy");
const axios = require("axios");
require('dotenv').config();

const bot = new Bot(process.env.BOT_CLIENT_API_KEY);


// Start the server
if (process.env.NODE_ENV === "production") {
    // Use Webhooks for the production server
    const app = express();
    app.use(express.json());
    app.use(webhookCallback(bot, "express"));
  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Bot listening on port ${PORT}`);
    });
} else {
    // Use Long Polling for development
    bot.start();
}
