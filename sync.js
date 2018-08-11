const Discord = require("discord.js");
const guild = message.guild;

module.exports.run(bot, message, args) => {
  const modlog = message.guild.channels.find("name", "burritobot-modlogs");
  const rolelog = message.guild.channels.find("name", "role-logs");
  const welcomeLeave = message.guild.channels.find("name", "welcome-leave");
  try {
    await bot.channels.get(modlog.id).send("Swoosh, moderation actions will be logged here!")
  }catch(e){
    message.channel.send(":x: I could not find a channel called `burritobot-modlogs`!")
  };
  try {
    await bot.channels.get(rolelog.id).send("Wee woo, role-logs will be logged here!")
  }catch(e){
    message.channel.send(":x: I could not find a channel called `role-logs`!")
  };
  try {
    await bot.channels.get(welcomeLeave.id).send(":banana: Welcome and leave messages will be sent here!")
  }catch(e){
    message.channel.send(":x: I could not find a channel called `welcome-leave`!")
  };

};

module.exports.help = {
  name: "sync"
}
