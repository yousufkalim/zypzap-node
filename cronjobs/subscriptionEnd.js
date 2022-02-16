const User = require("../../models/users");
let cron = require("node-cron");

//cron-job that will run after every 30days to delete all expired subscription from DB
cron.schedule("0 5 */30 * *", async () => {
  const timeNow = new Date();
  const users = await User.find();
  if (!users) return res.status(404).send("Users Not Found");
  //    All user how have that expire subscription
  const UsersOfExpiredsubScription = users.filter(
    (user) => user.subscription.end_date < timeNow
  );
  // update users and cancle their subscription
  UsersOfExpiredsubScription.map((user) => {
    user.subscription.subscribed = false;
    user.subscription.start_date = null;
    user.subscription.end_date = null;
    await user.save();
  });
});
