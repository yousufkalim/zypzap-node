const Notifications = require("../../models/notifications");

//cron-job that will run after every 10days to delete all expired notifications from DB
let cron = require("node-cron");
cron.schedule("0 12 */30 * *", async () => {
  const timeNow = new Date();
  const delNotifications = await Notifications.deleteMany({
    expiry_date: { $lt: timeNow },
  });
});
