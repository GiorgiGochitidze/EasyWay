// jobs/cardExpirationJob.js
const cron = require("node-cron");
const Card = require("../models/CardSchema/Card");

function startCardExpirationJob() {
  // Runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    console.log("🔄 Running daily card expiration check...");
    const now = new Date().toISOString();

    const result = await Card.updateMany(
      { endDate: { $lt: now }, status: "active" },
      { status: "expired" }
    );

    console.log(`✅ Expired cards updated: ${result.modifiedCount || 0}`);
  });
}

module.exports = startCardExpirationJob;
