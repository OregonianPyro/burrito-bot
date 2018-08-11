if (command === "mute") {
  if (!message.member.permissions.has('KICK_MEMBERS')) {
    message.delete();
    return message.channel.send("You must be a moderator to run this command.");
  };
  if (!guild.me.permissions.has('MANAGE_ROLES')) {
    message.delete();
    return message.channel.send("**Fatal error occured: Missing `MANAGE_ROLES` permission.**");
  };
  const muteRole = message.guild.roles.find("name", "Muted");
  if (!muteRole) {
    message.delete();
    return message.channel.send("**Fatal error occured: Could not find a role called `Muted`!**");
  };
  if (!member.kickable) {
    message.delete();
    return message.channel.send("That user cannot be muted!");
  };
  const reason = args.slice(1).join(' ');
  if (reason.length < 1) {
    message.delete();
    return message.channel.send(`Error parsing reason.`);
  };
  var embed = new Discord.RichEmbed()
      .setColor("000305")
      .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Muted")
      .setDescription(`${member.user.username} has been muted for ${ms(ms(time), {long: true})} by **${message.author.username}**`)
      .addField("Reason", reason)
await message.delete();
try {
  await member.addRole(muteRole);
}catch(e){
  return message.channel.send(`**Fatal error occured: ${e}`);
};
await message.channel.send(member.user, embed);
const modLog = message.guild.channels.find("name", "burritobot-modlogs");
  var mLog = new Discord.RichEmbed()
      .setColor("000305")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was muted for **${ms(ms(time), {long: true})}** by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
try {
  await bot.channels.get(modLog.id).send(mLog);
}catch(e){
  console.log(chalk.bgBlack.redBright`Error in command (${prefix}mute): modLog error: ${e}`);
  return message.channel.send(`Failed to parse log to moderation log channel. Check console.`);
};
setTimeout(function() {
  member.removeRole(muteRole)
}, ms(time));
};
