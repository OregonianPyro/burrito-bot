const Discord = require("discord.js");

module.exports.run(bot, message, args) => {
  if (command === "roll")
  rolls = ["1", "2", "3", "4", "5", "6"];
  let result = rolls[Math.floor(Math.random() * rolls.length)];
  var dice = new Discord.RichEmbed()
      .setColor("f44242")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Dice Rolled!")
      .addField(`${message.author.username} rolls a dice, and it lands on...`, `a \`${result}\`!`)
      .setThumbnail("http://www.zamagame.com/wp-content/uploads/2015/02/One-Dice.png")
  message.channel.send(dice);
};

module.exports.help = {
  name: "roll"
}
