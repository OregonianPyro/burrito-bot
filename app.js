const Discord = require("discord.js");
//top
const bot = new Discord.Client();
const helpColor = "0f6ec6"
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");
const ms = require("ms");
const superagent = require("superagent");
const warnIcon = "https://images-ext-1.discordapp.net/external/7dH_uD2RFKRGBUwjrRDQfPQqHErC4FdtuQqEgSWGIKw/https/images-ext-2.discordapp.net/external/YOFq2c4Lm2QwcX9z0AbfW6eYUmb4puIwq7c2GCOI-hg/https/cdn.discordapp.com/emojis/407074394436009984.png";
const mColor = "70ef74";
const dColor = "ef7070";
//const warns = require("./warnings.json");
const settings = require("./settings.json");
const modOnly = "You must be a moderator to run this command.";
const adminOnly = "You must be an administrator to run this command.";
const mNoPerm = "You do not have permission to use this command.";
const mLogE = "Failed to parse log to modlog channel.";
const logE = "Failed to parse log to moderation logs channel."
const warns = require("./warnings.json");
const muteIcon = "https://images-ext-1.discordapp.net/external/jN6t8-rKAt8tWr9yQmaUxd6ESodCURL3yhLTis6UAE4/https/images-ext-1.discordapp.net/external/XKGdv2cnFmW8T3lO-QXSJ0ldcf6kOgPIEgrDSwVPbQU/https/cdn.discordapp.com/emojis/368871483394752512.png";
const banIcon = "https://images-ext-2.discordapp.net/external/PDlcW9CSEOn6gU0GAzmT3Nz_b6d8FPsVD7kjLw_ngd4/https/images-ext-1.discordapp.net/external/XpwIa1YTBI2ikmT9-ECsWb48Tccu0lfGDq2fLBAKWxI/https/images-ext-2.discordapp.net/external/Tiit4dkGjZpEm9ra8ddD2kgvZ4BHcLLT7w1V7NwH0rE/https/cdn.discordapp.com/emojis/368871667881213952.png";
const kickIcon = "https://images-ext-2.discordapp.net/external/0KAC539JY6OIalWMWrsl_EMduF2KnZIDkaeOZSmoiZI/https/images-ext-2.discordapp.net/external/mgW9zgBY_2k1Byk_VdBLNkEHI0WjeH8qxJiG62idkIo/https/cdn.discordapp.com/emojis/369196970289528845.png"
// const isMuted = require("./muted.json");
//ready event
bot.on("ready", () => {
  console.log(chalk.bgBlack.blueBright`[ BURRITODEV IS NOW ONLINE ]`);
  bot.user.setActivity('Myself being coded', { type: 'WATCHING' });
  bot.user.setStatus("dnd");
});
bot.on("guildBanRemove", (Guild, User) => {
  let log = new Discord.RichEmbed()
    .setColor("00FF00")
    .setAuthor(User.username, User.displayAvatarURL)
    .setTitle("User Unbanned")
    .setDescription(`**${User.tag}** ( ${User.id} ) was unbanned by **undefined**`)
    .addField("Reason", "N/A")
    .setFooter(moment().format('LLLL'))
  let modLog = bot.channels.find("name", settings.modLog)
  bot.channels.get(modLog.id).send(log);
});
// bot.on("channelCreate", (channel) => {
//   let embed = new Discord.RichEmbed()
//       .setColor(mColor)
//       .setAuthor(channel.guild.name, channel.guild.iconURL)
//       .setTitle("Channel Created")
//       .setDescription(`The channel ( **#${channel.name}** ) was created.`)
//       .setFooter(moment().format('LLLL'))
//   let logs = bot.channels.find("name", "server-logs");
//   if (!logs) return;
//   bot.channels.get(logs.id).send(embed);
// });
//channel delete event
bot.on("channelDelete", (channel) => {
  let embed = new Discord.RichEmbed()
    .setColor(dColor)
    .setAuthor(channel.guild.name, channel.guild.iconURL)
    .setTitle("Channel Deleted")
    .setDescription(`The channel ( **#${channel.name}** ) was deleted.`)
    .setFooter(moment().format('LLLL'))
  let logs = bot.channels.find("name", "server-logs");
  if (!logs) return;
  bot.channels.get(logs.id).send(embed);
});
//channel update
// bot.on("channelUpdate", (oldChannel, newchannel) => {
//   let embed = new Discord.RichEmbed()
//       .setColor(mColor)
//       .setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL)
//       .setTitle("Channel Updated")
//       .setDescription(`The channel ( **#${oldChannel.name}** ) was updated.`)
//       .setFooter(moment().format('LLLL'))
//   let logs = bot.channels.find("name", "server-logs");
//   if (!logs) return;
//   bot.channels.get(logs.id).send(embed);
// });
//emote made
bot.on("emojiCreate", (emoji) => {
  let embed = new Discord.RichEmbed()
    .setColor(mColor)
    .setAuthor(emoji.guild.name, emoji.guild.iconURL)
    .setTitle("Emoji Created")
    .setDescription(`The emoji ${emoji} ( :${emoji.name} ) was created.`)
    .setFooter(moment().format('LLLL'))
  let logs = bot.channels.find("name", "server-logs");
  if (!logs) return;
  bot.channels.get(logs.id).send(embed);
});
bot.on("emojiDelete", (emoji) => {
  let embed = new Discord.RichEmbed()
    .setColor(dColor)
    .setAuthor(emoji.guild.name, emoji.guild.iconURL)
    .setTitle("Emoji D")
    .setDescription(`The emoji ${emoji} ( :${emoji.name} ) was deleted.`)
    .setFooter(moment().format('LLLL'))
  let logs = bot.channels.find("name", "server-logs");
  if (!logs) return;
  bot.channels.get(logs.id).send(embed);
});
bot.on("emojiUpdate", (emoji) => {
  let embed = new Discord.RichEmbed()
    .setColor(mColor)
    .setAuthor(emoji.guild.name, emoji.guild.iconURL)
    .setTitle("Emoji Updated")
    .setDescription(`The emoji ${emoji} was updated.`)
    .setFooter(moment().format('LLLL'))
  let logs = bot.channels.find("name", "server-logs");
  if (!logs) return;
  bot.channels.get(logs.id).send(embed);
});
// bot.on("guildMemberAdd", (member) => {
//   let responses = [`Look out, ${member.user.username} slid in`, `Looks like ${member.user.username} found their way here!`, `Great, ${member.user.username} is here!`, `Oh, I guess ${member.user.username} wants to be here..`, `Who invited ${member.user.username}!?`, `Howdy, ${member.user.username} :cowboy:`, `Woohoo, ${member.user.username} is here! Yayayayayay!!`];
//   let replies = responses[Math.floor(Math.random() * responses.length)];
//   let channel = member.guild.channels.find("name", "general");
//   let welcome = new Discord.RichEmbed()
//     .setColor('RANDOM')
//     .setAuthor(member.guild.name, member.guild.iconURL)
//     .setTitle("Woohoo, new friend!")
//     .setThumbnail(member.user.displayAvatarURL)
//     .setDescription(`${replies}`)
//     .setFooter(`Currently ${member.guild.memberCount} members!`)
//   bot.channels.get(channel.id).send(member.user, welcome);
  // let role = member.guild.roles.find("name", "supporter");
  // member.addRole(role);
//   let embed = new Discord.RichEmbed()
//     .setColor(mColor)
//     .setAuthor(member.guild.name, member.guild.iconURL)
//     .setTitle("Member Joined")
//     .setDescription(`${member.user.username} ( ${member.user.id} ) joined the ${member.guild.name}`)
//     .setFooter(moment().format('LLLL'))
//   let logs = bot.channels.find("name", "server-logs");
//   if (!logs) return;
//   bot.channels.get(logs.id).send(embed);
// });
//message event
bot.on("message", async message => {
  const mLogged = message.guild.channels.find("name", "server-logs");

  const guild = message.guild;
  //advert automod 
  if (message.content.toLowerCase().includes("discord.gg/")) {
    if (message.channel.id === "394214637840629770") return;
    if (message.member.permissions.has('KICK_MEMBERS')) return;
    const member = message.member;
    await message.delete();
    var warned = new Discord.RichEmbed()
      .setColor("0f6ec6")
      .setAuthor(bot.user.username, bot.user.displayAvatarURL)
      .setThumbnail(warnIcon)
      .setTitle("Warning Issued")
      .setDescription(`${member.user.username} has been warned by **${bot.user.username}**\n\nPlease familiarize yourself with the server rules and warning thresholds!`)
      .addField("Reason", "Advertising")
    message.channel.send(member.user, warned);
    let modLogs = message.guild.channels.find("name", settings.modLog);
    var wLog = new Discord.RichEmbed()
      .setColor("0f6ec6")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setTitle("User Warned")
      .setDescription(`**${member.user.tag}** was warned by **${bot.user.tag}**`)
      .addField("Reason", "Advertising")
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLogs.id).send(wLog);
    try {
      if (!warns[member.user.id]) warns[member.user.id] = {
        warns: 0
      };
      warns[member.user.id].warns++;
      fs.writeFile("./warnings.json", JSON.stringify(warns));
    } catch (e) {
      message.channel.send(`Error recording warning: \`JSON\` error! (${e})`)
    };
    if (warns[member.user.id].warns === 3) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(muteIcon)
        .setColor("000001")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`${member.user.username} has been muted for 1 day by **${bot.user.username}**`)
        .addField("Reason", "3rd Warning")
      await message.channel.send(member.user, warn);
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("000001")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`**${member.user.tag}** was muted for 1 day by **${bot.user.tag}**`)
        .addField("Reason", "3rd Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const muteRole = message.guild.roles.find("name", settings.muteRole)
      const time = "1d";
      member.addRole(muteRole)
      setTimeout(function () {
        member.removeRole(muteRole)
      }, ms(time));
    };
    //4warns
    if (warns[member.user.id].warns === 4) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(muteIcon)
        .setColor("000001")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`${member.user.username} has been muted for 3 days by **${bot.user.username}**`)
        .addField("Reason", "4th Warning")
      await message.channel.send(member.user, warn);
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("000001")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`**${member.user.tag}** was muted for 3 days by **${bot.user.tag}**`)
        .addField("Reason", "4th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const muteRole = message.guild.roles.find("name", settings.muteRole)
      const time = "3d";
      member.addRole(muteRole)
      setTimeout(function () {
        member.removeRole(muteRole)
      }, ms(time));
    };
    //5warns
    if (warns[member.user.id].warns === 5) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(kickIcon)
        .setColor("f27e02")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Kicked")
        .setDescription(`${member.user.username} has been kicked by **${bot.user.username}**`)
        .addField("Reason", "5th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been kicked from ${message.guild.name} by **${bot.user.tag}**\n\nReason: 5th Warning (automod)`)
      } catch (e) {
        console.log(e);
      };
      member.kick("5th Warning");
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f27e02")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Kicked")
        .setDescription(`**${member.user.tag}** was kicked by **${bot.user.tag}**`)
        .addField("Reason", "5th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
    };
    //6warns
    if (warns[member.user.id].warns === 6) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(banIcon)
        .setColor("f23030")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`${member.user.username} has been banned for 3 days by **${bot.user.username}**`)
        .addField("Reason", "6th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been banned from ${message.guild.name} for 3 days by **${bot.user.tag}**\n\nReason: 6th Warning (automod)`);
      } catch (e) {
        console.log(e)
      };
      member.ban("6th Warning")
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f23030")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`**${member.user.tag}** was banned for **3 days** by **${bot.user.tag}**`)
        .addField("Reason", "6th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const time = "3d";
      setTimeout(function () {
        guild.unban(member.user.id);
      }, ms(time));
    };
    //7warns
    if (warns[member.user.id].warns === 7) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(banIcon)
        .setColor("f23030")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`${member.user.username} has been banned for 7 days by **${bot.user.username}**`)
        .addField("Reason", "7th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been banned from ${message.guild.name} for 7 days by **${bot.user.tag}**\n\nReason: 7th Warning (automod)`);
      } catch (e) {
        console.log(e)
      };
      member.ban("7th Warning")
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f23030")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`**${member.user.tag}** was banned for **7 days** by **${bot.user.tag}**`)
        .addField("Reason", "7th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const time = "7d";
      setTimeout(function () {
        guild.unban(member.user.id);
      }, ms(time));
    };
    //8warns
    if (warns[member.user.id].warns === 8) {
      var warn = new Discord.RichEmbed()
        .setColor("ce0000")
        .setThumbnail(banIcon)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Hard-Banned")
        .setDescription(`${member.user.username} has been hard-banned by **${bot.user.username}**\n\nAll of their message sent in the previous 24 hours have been deleted and the user has been banned.`)
        .addField("Reason", "8th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been hard-banned from ${message.guild.name} by **${bot.user.tag}**\n\nReason: 8th Warning (automod)`);
      } catch (e) {
        console.log(e);
      };
      await member.ban(1);
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        return message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var log = new Discord.RichEmbed()
        .setColor("ce0000")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Hard-Banned")
        .setDescription(`**${member.user.tag}** was hard-banned by **${bot.user.tag}**`)
        .addField("Reason", "8th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(log);
    };
  };
  //racial slurs EWWWWW 
  let racistWords = ["nigger", "nigga", "nibba", "niga", "niger", "n.i.g.g.a.", "n.i.g.g.e.r.", "niggger", "nibba"];
  if (racistWords.some(word => message.content.toLowerCase().includes(word))) {
    const member = message.member;
    await message.delete();
    var warned = new Discord.RichEmbed()
      .setColor("0f6ec6")
      .setAuthor(bot.user.username, bot.user.displayAvatarURL)
      .setThumbnail(warnIcon)
      .setTitle("Warning Issued")
      .setDescription(`${member.user.username} has been warned by **${bot.user.username}**\n\nPlease familiarize yourself with the server rules and warning thresholds!`)
      .addField("Reason", "Racial Slurs")
    message.channel.send(member.user, warned);
    let modLogs = message.guild.channels.find("name", settings.modLog);
    var wLog = new Discord.RichEmbed()
      .setColor("0f6ec6")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setTitle("User Warned")
      .setDescription(`**${member.user.tag}** was warned by **${bot.user.tag}**`)
      .addField("Reason", "Racial Slurs")
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLogs.id).send(wLog);
    try {
      if (!warns[member.user.id]) warns[member.user.id] = {
        warns: 0
      };
      warns[member.user.id].warns++;
      fs.writeFile("./warnings.json", JSON.stringify(warns));
    } catch (e) {
      message.channel.send(`Error recording warning: \`JSON\` error! (${e})`)
    };
    if (warns[member.user.id].warns === 3) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(muteIcon)
        .setColor("000001")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`${member.user.username} has been muted for 1 day by **${bot.user.username}**`)
        .addField("Reason", "3rd Warning")
      await message.channel.send(member.user, warn);
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("000001")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`**${member.user.tag}** was muted for 1 day by **${bot.user.tag}**`)
        .addField("Reason", "3rd Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const muteRole = message.guild.roles.find("name", settings.muteRole)
      const time = "1d";
      member.addRole(muteRole)
      setTimeout(function () {
        member.removeRole(muteRole)
      }, ms(time));
    };
    //4warns
    if (warns[member.user.id].warns === 4) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(muteIcon)
        .setColor("000001")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`${member.user.username} has been muted for 3 days by **${bot.user.username}**`)
        .addField("Reason", "4th Warning")
      await message.channel.send(member.user, warn);
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("000001")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`**${member.user.tag}** was muted for 3 days by **${bot.user.tag}**`)
        .addField("Reason", "4th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const muteRole = message.guild.roles.find("name", settings.muteRole)
      const time = "3d";
      member.addRole(muteRole)
      setTimeout(function () {
        member.removeRole(muteRole)
      }, ms(time));
    };
    //5warns
    if (warns[member.user.id].warns === 5) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(kickIcon)
        .setColor("f27e02")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Kicked")
        .setDescription(`${member.user.username} has been kicked by **${bot.user.username}**`)
        .addField("Reason", "5th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been kicked from ${message.guild.name} by **${bot.user.tag}**\n\nReason: 5th Warning (automod)`)
      } catch (e) {
        console.log(e);
      };
      member.kick("5th Warning");
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f27e02")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Kicked")
        .setDescription(`**${member.user.tag}** was kicked by **${bot.user.tag}**`)
        .addField("Reason", "5th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
    };
    //6warns
    if (warns[member.user.id].warns === 6) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(banIcon)
        .setColor("f23030")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`${member.user.username} has been banned for 3 days by **${bot.user.username}**`)
        .addField("Reason", "6th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been banned from ${message.guild.name} for 3 days by **${bot.user.tag}**\n\nReason: 6th Warning (automod)`);
      } catch (e) {
        console.log(e)
      };
      member.ban("6th Warning")
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f23030")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`**${member.user.tag}** was banned for **3 days** by **${bot.user.tag}**`)
        .addField("Reason", "6th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const time = "3d";
      setTimeout(function () {
        guild.unban(member.user.id);
      }, ms(time));
    };
    //7warns
    if (warns[member.user.id].warns === 7) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(banIcon)
        .setColor("f23030")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`${member.user.username} has been banned for 7 days by **${bot.user.username}**`)
        .addField("Reason", "7th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been banned from ${message.guild.name} for 7 days by **${bot.user.tag}**\n\nReason: 7th Warning (automod)`);
      } catch (e) {
        console.log(e)
      };
      member.ban("7th Warning")
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f23030")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`**${member.user.tag}** was banned for **7 days** by **${bot.user.tag}**`)
        .addField("Reason", "7th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const time = "7d";
      setTimeout(function () {
        guild.unban(member.user.id);
      }, ms(time));
    };
    //8warns
    if (warns[member.user.id].warns === 8) {
      var warn = new Discord.RichEmbed()
        .setColor("ce0000")
        .setThumbnail(banIcon)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Hard-Banned")
        .setDescription(`${member.user.username} has been hard-banned by **${bot.user.username}**\n\nAll of their message sent in the previous 24 hours have been deleted and the user has been banned.`)
        .addField("Reason", "8th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been hard-banned from ${message.guild.name} by **${bot.user.tag}**\n\nReason: 8th Warning (automod)`);
      } catch (e) {
        console.log(e);
      };
      await member.ban(1);
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        return message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var log = new Discord.RichEmbed()
        .setColor("ce0000")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Hard-Banned")
        .setDescription(`**${member.user.tag}** was hard-banned by **${bot.user.tag}**`)
        .addField("Reason", "8th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(log);
    };
  };
  //channelCreate event
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const prefix = settings.prefix;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length).toLowerCase();

  let args = message.content.split(" ").slice(1);
  //automod

  if (!message.content.startsWith(prefix)) return;

  //help + info  [ping, help, info, docs, support]
  // if (command === "help") {
  //     return message.channel.send("Hey there! I'm BurritoDev, the :b:eta version of BurritoBot! This is the bot my owner will use to test new code on before transfering it to the main bot. This helps to elimnate downtime and constant restarts of the main bot. :D");
  // };
  //moderation [give, take, , kik, unban, set topic, say, sayg, vwarn, warn, mute, unmute, kick. sban, tban, ban, hban, prune/purge/clear/clean/delete, clearwarns, warns @user]
  if (command === "give") {
    const guild = message.guild;
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.delete();
      return message.channel.send(mNoPerm);
    };
    if (!guild.me.permissions.has('MANAGE_ROLES')) {
      message.delete();
      return message.channel.send("**Fatal error occurred: Missing `MANAGE_ROLES` permission.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (!member.kickable) {
      message.delete();
      return message.channel.send("Cannot edit roles for that user since they have a role higher than the bot.");
    };
    let mRole = args.slice(1).join(' ');
    if (!mRole) {
      message.delete();
      return message.channel.send("Error: could not parse role.");
    };
    let role = message.guild.roles.find("name", mRole)
    if (!role) {
      message.delete();
      return message.channel.send("Could not find that role.");
    };
    if (member.roles.has(role.id)) {
      message.delete();
      return message.channel.send("That user appears to already have that role.");
    };
    await message.delete();
    try {
      await member.addRole(role);
    } catch (e) {
      return message.channel.send(`Error: ${e}`);
    };
    var success = new Discord.RichEmbed()
      .setColor("15a000")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Role Given")
      .setDescription(`${member.user.username} has been given the \`${role.name}\` role by ${message.author.username}`)
    message.channel.send(success)
    const roleLog = message.guild.channels.find("name", "role-logs");
    if (!roleLog) return;
    var rLog = new Discord.RichEmbed()
      .setColor("15a000")
      .setDescription(`**${message.author.tag}** gave **${member.user.tag}** the \`${role.name}\` role`)
      .setFooter(moment().format('LLLL'))
    await bot.channels.get(roleLog.id).send(rLog);
  };
  if (command === "take") {
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.delete();
      return message.channel.send(mNoPerm);
    };
    if (!guild.me.permissions.has('MANAGE_ROLES')) {
      message.delete();
      return message.channel.send("**Fatal error occurred: Missing `MANAGE_ROLES` permission.**")
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (!member.kickable) {
      message.delete();
      return message.channel.send("Cannot edit roles for that user since they have a role higher than the bot.");
    };
    const role = args.slice(1).join(' ');
    if (!role) {
      message.delete();
      return message.channel.send("Error: could not parse role.");
    };
    const toRole = message.guild.roles.find("name", role);
    if (!toRole) {
      message.delete();
      return message.channel.send("Could not find that role.");
    };
    if (!member.roles.has(toRole.id)) {
      message.delete();
      return message.channel.send("That user does not appear to have that role.")
    };
    await message.delete();
    try {
      await member.removeRole(toRole);
    } catch (e) {
      return message.channel.send(`Error: ${e}`);
    };
    var success = new Discord.RichEmbed()
      .setColor("a00000")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Role Taken")
      .setDescription(`${message.author.username} took the \`${toRole.name}\` role from ${member.user.username}`)
    message.channel.send(success)
    const roleLog = message.guild.channels.find("name", "role-logs");
    if (!roleLog) return;
    var rLog = new Discord.RichEmbed()
      .setColor("a00000")
      .setDescription(`**${message.author.tag}** took the \`${toRole.name}\` role from **${member.user.tag}**`)
      .setFooter(moment().format('LLLL'))
    await bot.channels.get(roleLog.id).send(rLog);
  };
  if (command === "vwarn") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly)
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`vwarn\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    const reason = args.slice(1).join(' ');
    if (!reason) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    var vwarn = new Discord.RichEmbed()
      .setColor("FFF000")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("Verbal Warning Issued")
      .setDescription(`${member.user.username} has been verbally warned by **${message.author.username}**\n\nVerbal warnings do not show on your record.\nPlease read over and familiarize yourself with the server rules. This is your one and only verbal warning!`)
      .addField("Reason", reason)
      .setThumbnail("https://images-ext-1.discordapp.net/external/t_4WXOzODD3VEbaesMdlG-i0xkp_E-qq2NLCepwOYuE/https/goo.gl/39Ydkq?width=80&height=71")
    await message.delete();
    message.channel.send(member.user, vwarn);
  };
  if (command === "mute") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`mute\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('MANAGE_ROLES')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `MANAGE_ROLES` permission.**");
    };
    const muteRole = message.guild.roles.find("name", settings.muteRole);
    if (!muteRole) {
      message.delete();
      return message.channel.send("**Fatal error occured: Could not find a role called `Muted`.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (!member.kickable) {
      message.delete();
      return message.channel.send("That user cannot be muted as they have a higher role than the bot.");
    };
    const time = args[1];
    if (!time) {
      message.delete();
      return message.channel.send("Error: Could not parse duration.");
    };
    const reason = args.slice(2).join(' ');
    if (!reason) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    var mEmbed = new Discord.RichEmbed()
      .setColor("000001")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(`${member.user.username} has been muted for ${ms(ms(time), { long: true })} by **${message.author.username}**`)
      .addField("Reason", reason)
      .setThumbnail("https://images-ext-1.discordapp.net/external/XKGdv2cnFmW8T3lO-QXSJ0ldcf6kOgPIEgrDSwVPbQU/https/cdn.discordapp.com/emojis/368871483394752512.png")
    await message.delete();
    try {
      member.addRole(muteRole)
    } catch (e) {
      return message.channel.send(`**Fatal error occured: ${e}**`);
    };
    await message.channel.send(member.user, mEmbed);
    const modLog = message.guild.channels.find("name", settings.modLog);
    var mLog = new Discord.RichEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was muted for **${ms(ms(time), { long: true })}** by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
      .setColor("000001")
    if (!modLog) {
      message.channel.send(`Failed to parse log to moderation logs channel.`);
    };
    bot.channels.get(modLog.id).send(mLog)
    setTimeout(function () {
      member.removeRole(muteRole)
    }, ms(time));
  };
  if (command === "unmute") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`unmute\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('MANAGE_ROLES')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `MANAGE_ROLES` permission.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    const muteRole = message.guild.roles.find("name", settings.muteRole);
    if (!member.roles.has(muteRole.id)) {
      message.delete();
      return message.channel.send("That user does not appear to be muted.");
    };
    if (!member.kickable) {
      message.delete();
      return message.channel.send("I cannot unmute that user as they have a higher role than the bot.");
    };
    var reason = args.slice(1).join(' ');
    if (!reason) reason = "N/A";
    await message.delete();
    try {
      member.removeRole(muteRole);
    } catch (e) {
      return message.channel.send(`**Fatal error occured: ${e}**`);
    };
    var embed = new Discord.RichEmbed()
      .setColor("000001")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle("User Unmuted")
      .setDescription(`${member.user.username} has been unmuted by **${message.author.username}**`)
      .addField("Reason", reason)
    await message.channel.send(member.user, embed);
    const modLog = message.guild.channels.find("name", settings.modLog);
    if (!modLog) return message.channel.send("Faile to parse log to moderation logs channel.")
    var uLog = new Discord.RichEmbed()
      .setColor("000001")
      //.setTitle("User Unmuted")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was unmuted by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLog.id).send(uLog);
  };
  //kick command!!
  if (command === "kick") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`kick\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('KICK_MEMBERS')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `KICK_MEMBERS` permission.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (member.user.id === message.author.id) {
      message.delete();
      return message.channel.send("You can't kick yourself :face_palm:");
    };
    if (!member.kickable) {
      message.delete();
      return message.channel.send("That user cannot be kicked.");
    };
    // if (member.user.bot) {
    //   message.delete();
    //   return message.channel.send("Can't moderate bots <a:fidgetspin:419369592490819594>");
    // };
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    await message.delete();
    try {
      await member.send(`You have been kicked from ${message.guild.name} by **${message.author.tag}**\n\nReason: ${reason}`);
    } catch (e) {
      console.log(e);
    };
    var mKick = new Discord.RichEmbed()
      .setColor("ff8300")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle("User Kicked")
      .setDescription(`${member.user.username} has been kicked by **${message.author.username}**`)
      .addField("Reason", reason)
      .setThumbnail("https://cdn.discordapp.com/emojis/365790858890444802.png")
    await message.channel.send(member.user, mKick)
    await member.kick(`Kicked by ${message.author.tag} (${message.author.id}) at ${moment().format('LLLL')} for ${reason}`);
    const modLog = message.guild.channels.find("name", settings.modLog);
    if (!modLog) return message.channel.send("Failed to parse log to moderation logs channel.");
    var kLog = new Discord.RichEmbed()
      .setColor("ff8300")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was kicked by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLog.id).send(kLog)
  };
  if (command === "sban") {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`sban\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('BAN_MEMBERS')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `BAN_MEMBERS` permission.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (member.user.id === message.author.id) {
      message.delete();
      return message.channel.send("Why are you trying to ban yourself!? :face_palm:");
    };
    if (member.user.id === message.guild.owner.user.id) {
      message.delete();
      return message.channel.send("That user appears to be the guild owner; I can't ban them!")
    };
    if (!member.bannable) {
      message.delete();
      return message.channel.send("That user cannot be banned.");
    };
    const id = member.user.id;
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    await message.delete();
    var sEmbed = new Discord.RichEmbed()
      .setColor("67149b")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle("User Soft-Banned")
      .setDescription(`${member.user.username} has been soft-banned by **${message.author.username}**\n\nAll of their messages sent in the previous 24 hours have been deleted and the user has been unbanned.`)
      .addField("Reason", reason)
      .setThumbnail("https://images-ext-1.discordapp.net/external/XpwIa1YTBI2ikmT9-ECsWb48Tccu0lfGDq2fLBAKWxI/https/images-ext-2.discordapp.net/external/Tiit4dkGjZpEm9ra8ddD2kgvZ4BHcLLT7w1V7NwH0rE/https/cdn.discordapp.com/emojis/368871667881213952.png")
    try {
      await member.send(`You have been soft-banned from ${message.guild.name} by **${message.author.tag}**\n\nReason: ${reason}`);
    } catch (e) {
      console.log(e)
    };
    message.channel.send(member.user, sEmbed);
    try {
      member.ban(1);
    } catch (e) {
      return message.channel.send(`**Fatal error occured: ${e}**`);
    };
    const modLog = message.guild.channels.find("name", settings.modLog);
    var sLog = new Discord.RichEmbed()
      .setColor("67149b")
      .setFooter(moment().format('LLLL'))
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was soft-banned by **${message.author.tag}**`)
      .addField("Reason", reason)
    try {
      guild.unban(id);
    } catch (e) {
      return message.channel.send(`**Fatal error occured while attempting to unban the user: ${e}**`);
    };
    if (!modLog) return message.channel.send("Failed to parse log to moderation logs channel.");
    await bot.channels.get(modLog.id).send(sLog);
  };
  if (command === "kik") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      return message.channel.send(modOnly);
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    await message.delete();
    var kEmbed = new Discord.RichEmbed()
      .setColor("f27e02")
      .setThumbnail("https://images-ext-2.discordapp.net/external/mgW9zgBY_2k1Byk_VdBLNkEHI0WjeH8qxJiG62idkIo/https/cdn.discordapp.com/emojis/369196970289528845.png")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle("User Kicked")
      .setDescription(`${member.user.username} has been kicked by **${message.author.username}**`)
      .addField("Reason", reason)
    await message.channel.send(member.user, kEmbed)
    setTimeout(function () {
      message.channel.send("Pysche.")
    }, (5000));
  };
  if (command === "say") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`say\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    const toSay = args.slice(0).join(' ');
    if (toSay.length < 1) {
      return message.delete();
    };
    message.delete();
    return message.channel.send(toSay);
  };
  if (command === "sayg") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`sayg\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.delete();
    }
    const toSay = args.slice(1).join(' ');
    if (toSay.length < 1) {
      return message.delete();
    };
    await message.delete();
    bot.channels.get(channel.id).send(toSay);
  };
  if (command === "tban") {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`tban\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('BAN_MEMBERS')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `BAN_MEMBERS` permission.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (member.user.id === message.author.id) {
      message.delete();
      return message.channel.send("Why are you trying to ban yourself!? :face_palm:");
    };
    if (member.user.id === message.guild.owner.user.id) {
      message.delete();
      return message.channel.send("That user appears to be the guild owner; I can't ban them!")
    };
    if (!member.bannable) {
      message.delete();
      return message.channel.send("That user cannot be banned.");
    };
    const id = member.user.id;
    const time = args[1];
    if (!time) {
      message.delete();
      return message.channel.send("Error: Could not parse duration.");
    };
    const reason = args.slice(2).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    await message.delete();
    // try {
    await member.send(`You have been temp-banned from ${message.guild.name} for **${ms(ms(time), { long: true })}** by **${message.author.tag}**\n\nReason: ${reason}`);
    // }catch(e){
    //   console.log(e);
    // };
    const tEmbed = new Discord.RichEmbed()
      .setColor("f23030")
      .setThumbnail("https://images-ext-1.discordapp.net/external/XpwIa1YTBI2ikmT9-ECsWb48Tccu0lfGDq2fLBAKWxI/https/images-ext-2.discordapp.net/external/Tiit4dkGjZpEm9ra8ddD2kgvZ4BHcLLT7w1V7NwH0rE/https/cdn.discordapp.com/emojis/368871667881213952.png")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle("User Temp-Banned")
      .setDescription(`${member.user.username} has been temp-banned for ${ms(ms(time), { long: true })} by **${message.author.username}**`)
      .addField("Reason", reason)
    await message.channel.send(member.user, tEmbed);
    // try {
    await member.ban(`Banned for ${ms(ms(time), { long: true })} by ${message.author.tag} (${message.author.id}) for ${reason}`);
    // }catch(e){
    //   return message.channel.send(`**Fatal error occured while attempting to ban the user: ${e}**`);
    // };
    const modLog = message.guild.channels.find("name", settings.modLog);
    if (!modLog) {
      message.channel.send("Failed to parse log to moderation logs channel.");
    };
    const tLog = new Discord.RichEmbed()
      .setColor("f23030")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was banned for **${ms(ms(time), { long: true })}** by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
    await bot.channels.get(modLog.id).send(tLog);
    bot.fetchUser(id)
      .then((User) => {
        const mTag = User.tag;
        const mUser = User.username
        const mID = User.id;
        const mAV = User.displayAvatarURL;
        setTimeout(function () {
          const uLog = new Discord.RichEmbed()
            .setColor("00FF00")
            .setAuthor(mUser, mAV)
            .setDescription(`**${mTag}** was unbanned by **${bot.user.tag}**`)
            .addField("Reason", "Duration of ban reached.")
            .setFooter(moment().format('LLLL'))
          guild.unban(id)
          bot.channels.get(modLog.id).send(uLog)
        }, ms(time));
      })
      .catch((err) => {
        console.log(err)
      })
  };
  if (command === "ban") {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`ban\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('BAN_MEMBERS')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `BAN_MEMBERS` permission.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (member.user.id === message.author.id) {
      message.delete();
      return message.channel.send("Why are you trying to ban yourself!? :face_palm:");
    };
    if (member.user.id === message.guild.owner.user.id) {
      message.delete();
      return message.channel.send("That user appears to be the guild owner; I can't ban them!")
    };
    if (!member.bannable) {
      message.delete();
      return message.channel.send("That user cannot be banned.");
    };
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    await message.delete();
    try {
      member.send(`You have been banned from ${message.guild.name} by **${message.author.tag}**\n\nReason: ${reason}`);
    } catch (e) {
      console.log(e);
    };
    var bEmbed = new Discord.RichEmbed()
      .setColor("ff0000")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(`${member.user.username} has been banned by **${message.author.username}**`)
      .addField("Reason", reason)
      .setThumbnail("https://images-ext-2.discordapp.net/external/Tiit4dkGjZpEm9ra8ddD2kgvZ4BHcLLT7w1V7NwH0rE/https/cdn.discordapp.com/emojis/368871667881213952.png")
    setTimeout(function () {
      message.channel.send(member.user, bEmbed)
    }, (1000));
    setTimeout(function () {
      member.ban(`Banned by ${message.author.tag} (${message.author.id}) on ${moment().format('LLLL')} for ${reason}`)
    }, (1000));
    const modLog = message.guild.channels.find("name", settings.modLog);
    if (!modLog) return message.channel.send(logE);
    var bLog = new Discord.RichEmbed()
      .setColor("ff0000")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was banned by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLog.id).send(bLog);
  };
  if (command === "hban") {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`hban\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('BAN_MEMBERS')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `BAN_MEMBERS` permission.**");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (member.user.id === message.author.id) {
      message.delete();
      return message.channel.send("Why are you trying to ban yourself!? :face_palm:");
    };
    if (member.user.id === message.guild.owner.user.id) {
      message.delete();
      return message.channel.send("That user appears to be the guild owner; I can't ban them!")
    };
    if (!member.bannable) {
      message.delete();
      return message.channel.send("That user cannot be banned.");
    };
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send("Error: Could not parse reason.");
    };
    await message.delete();
    try {
      member.send(`You have been hard-banned from ${message.guild.name} by **${message.author.tag}**\n\nReason: ${reason}`);
    } catch (e) {
      console.log(e);
    };
    var bEmbed = new Discord.RichEmbed()
      .setColor("ce0000")
      .setTitle("User Hard-Banned")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(`${member.user.username} has been hard-banned by **${message.author.username}**`)
      .addField("Reason", reason)
      .setThumbnail("https://images-ext-2.discordapp.net/external/Tiit4dkGjZpEm9ra8ddD2kgvZ4BHcLLT7w1V7NwH0rE/https/cdn.discordapp.com/emojis/368871667881213952.png")
    setTimeout(function () {
      message.channel.send(member.user, bEmbed)
    }, (1000));
    setTimeout(function () {
      member.ban(1)
    }, (1000));
    const modLog = message.guild.channels.find("name", settings.modLog);
    if (!modLog) return message.channel.send(logE);
    var bLog = new Discord.RichEmbed()
      .setColor("ce0000")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setDescription(`**${member.user.tag}** was hard-banned by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLog.id).send(bLog);
  };
  if (command === "clear") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`clear\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    let toDelete = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Incorrect usage.")
    };
    // if (args[0] <= "1") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    // if (args[0] >= "100") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    await message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Cleared Messages Successfully!")
      .setDescription(`Successfully cleared ${args[0]} messages in #${message.channel.name}!`)
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(done).then(message => message.delete(5000));
    });
  };
  if (command === "delete") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`delete\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    let toDelete = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Incorrect usage.")
    };
    // if (args[0] < "1") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    // if (args[0] > "100") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    await message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Cleared Messages Successfully!")
      .setDescription(`Successfully cleared ${args[0]} messages in #${message.channel.name}!`)
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(done).then(message => message.delete(5000));
    });
  };
  if (command === "clean") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`clean\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    let toDelete = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Incorrect usage.")
    };
    // if (args[0] < "1") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    // if (args[0] > "100") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    await message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Cleared Messages Successfully!")
      .setDescription(`Successfully cleared ${args[0]} messages in #${message.channel.name}!`)
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(done).then(message => message.delete(5000));
    });
  };
  if (command === "prune") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`prune\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    let toDelete = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Incorrect usage.")
    };
    // if (args[0] < "1") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    // if (args[0] > "100") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    await message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Cleared Messages Successfully!")
      .setDescription(`Successfully cleared ${args[0]} messages in #${message.channel.name}!`)
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(done).then(message => message.delete(5000));
    });
  };
  if (command === "purge") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      return message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`purge\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    let toDelete = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Incorrect usage.")
    };
    // if (args[0] < "1") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    // if (args[0] > "100") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    await message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Cleared Messages Successfully!")
      .setDescription(`Successfully cleared ${args[0]} messages in #${message.channel.name}!`)
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(done).then(message => message.delete(5000));
    });
  };
  if (command === "sweep") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`sweep\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    let toDelete = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Incorrect usage.")
    };
    // if (args[0] < "1") {
    //   message.delete();
    //  message.channel.send(`I cannot sweep ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    // if (args[0] > "100") {
    //   message.delete();
    //  message.channel.send(`I cannot delete ${args[0]} messages!`).then(message => message.delete(5000))
    //  return;
    // }
    await message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Cleared Messages Successfully!")
      .setDescription(`Successfully cleared ${args[0]} messages in #${message.channel.name}!`)
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(done).then(message => message.delete(5000));
    });
  };
  // if (command === "clearwarns") {
  //   const member = message.mentions.members.first();
  //   if (!warns[member.user.id])
  //   return message.reply("No warns found.");
  //   if (warns[member.user.id].warns === 0) return message.reply("No warns found.")
  //    warns[member.user.id] = {
  //     warns: 0
  //   };
  //   fs.writeFile("./warnings.json", JSON.stringify(warns))
  // };
  if (command === "clearwarns") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete();
      message.channel.send(adminOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`clearwarns\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    if (member.user.id === message.author.id) {
      message.delete();
      message.channel.send("You can't clear your own warnings.");
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to clear their own warns in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!warns[member.user.id]) {
      message.delete();
      return message.channel.send("That user appears to have no warnings.");
    };
    if (warns[member.user.id].warns === 0) {
      message.delete();
      return message.channel.send("That user appears to have no warnings.");
    };
    var reason = args.slice(1).join(' ');
    if (reason.length < 1) reason = "N/A";
    await message.delete();
    warns[member.user.id] = {
      warns: 0
    };
    try {
      fs.writeFile("./warnings.json", JSON.stringify(warns))
    } catch (e) {
      return message.channel.send(`Error clearing warnings: \`JSON\` error! (${e})`)
    };
    var cleared = new Discord.RichEmbed()
      .setColor("#0f6ec6")
      .setThumbnail("https://images-ext-2.discordapp.net/external/YOFq2c4Lm2QwcX9z0AbfW6eYUmb4puIwq7c2GCOI-hg/https/cdn.discordapp.com/emojis/407074394436009984.png")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(`All current warnings for ${member.user.username} have been cleared by **${message.author.username}**`)
      .addField("Reason", reason)
    await message.channel.send(member.user, cleared);
    const modLog = message.guild.channels.find("name", settings.modLog);
    if (!modLog) return message.channel.send(logE);
    var cLog = new Discord.RichEmbed()
      .setColor("#0f6ec6")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setTitle("Warnings Cleared")
      .setDescription(`Warnings for **${member.user.tag}** were cleared by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLog.id).send(cLog);
  };
  if (command === "warns") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      var nowarns = new Discord.RichEmbed()
        .setColor("#0f6ec6")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`${message.author.tag} has no warnings recorded.`)
      if (!warns[message.author.id]) {
        message.delete();
        return message.channel.send(nowarns);
      };
      if (warns[message.author.id].warns === 0) {
        message.delete();
        return message.channel.send(nowarns);
      };
      message.delete();
      var myWarns = new Discord.RichEmbed()
        .setColor("#0f6ec6")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`${message.author.tag} has **${warns[message.author.id].warns}** warnings recorded.`)
      return message.channel.send(myWarns)
    };
    if (message.member.permissions.has('KICK_MEMBERS')) {
      var member = message.mentions.members.first();
      if (!member) member = message.member;
      var zerowarns = new Discord.RichEmbed()
        .setColor("#0f6ec6")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setDescription(`${member.user.tag} has no warnings recorded.`)
      if (!warns[member.user.id]) {
        message.delete();
        return message.channel.send(zerowarns);
      };
      if (warns[member.user.id].warns === 0) {
        message.delete();
        return message.channel.send(zerowarns);
      };
      var mWarns = new Discord.RichEmbed()
        .setColor("#0f6ec6")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setDescription(`${member.user.tag} has **${warns[member.user.id].warns}** warnings recorded.`)
      message.delete();
      return message.channel.send(mWarns);
    };
  };
  if (command === "warn") {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      message.delete();
      message.channel.send(modOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`warn\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send("User not found.");
    };
    const reason = args.slice(1).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send(`Error: Could not parse reason.`);
    };
    //delete the message
    await message.delete();
    //send it
    var warn = new Discord.RichEmbed()
      .setThumbnail("https://images-ext-1.discordapp.net/external/7dH_uD2RFKRGBUwjrRDQfPQqHErC4FdtuQqEgSWGIKw/https/images-ext-2.discordapp.net/external/YOFq2c4Lm2QwcX9z0AbfW6eYUmb4puIwq7c2GCOI-hg/https/cdn.discordapp.com/emojis/407074394436009984.png")
      .setColor("0f6ec6")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle("Warning Issued")
      .setDescription(`${member.user.username} has been warned by **${message.author.username}**\n\nPlease familiarize yourself with the server rules and warning thresholds!`)
      .addField("Reason", reason)
    await message.channel.send(member.user, warn);
    //log it in the JSON
    try {
      if (!warns[member.user.id]) warns[member.user.id] = {
        warns: 0
      };
      warns[member.user.id].warns++;
      fs.writeFile("./warnings.json", JSON.stringify(warns));
    } catch (e) {
      message.channel.send(`Error recording warning: \`JSON\` error! (${e})`)
    };
    //log it in modlogs
    const modLog = message.guild.channels.find("name", settings.modLog);
    if (!modLog) {
      message.channel.send("Failed to parse log to moderation logs channel.");
    };
    var wLog = new Discord.RichEmbed()
      .setColor("0f6ec6")
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setTitle("User Warned")
      .setDescription(`**${member.user.tag}** was warned by **${message.author.tag}**`)
      .addField("Reason", reason)
      .setFooter(moment().format('LLLL'))
    bot.channels.get(modLog.id).send(wLog);
    //3warns
    if (warns[member.user.id].warns === 3) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(muteIcon)
        .setColor("000001")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`${member.user.username} has been muted for 1 day by **${bot.user.username}**`)
        .addField("Reason", "3rd Warning")
      await message.channel.send(member.user, warn);
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("000001")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`**${member.user.tag}** was muted for 1 day by **${bot.user.tag}**`)
        .addField("Reason", "3rd Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const muteRole = message.guild.roles.find("name", settings.muteRole)
      const time = "1d";
      member.addRole(muteRole)
      setTimeout(function () {
        member.removeRole(muteRole)
      }, ms(time));
    };
    //4warns
    if (warns[member.user.id].warns === 4) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(muteIcon)
        .setColor("000001")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`${member.user.username} has been muted for 3 days by **${bot.user.username}**`)
        .addField("Reason", "4th Warning")
      await message.channel.send(member.user, warn);
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("000001")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Muted")
        .setDescription(`**${member.user.tag}** was muted for 3 days by **${bot.user.tag}**`)
        .addField("Reason", "4th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const muteRole = message.guild.roles.find("name", settings.muteRole)
      const time = "3d";
      member.addRole(muteRole)
      setTimeout(function () {
        member.removeRole(muteRole)
      }, ms(time));
    };
    //5warns
    if (warns[member.user.id].warns === 5) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(kickIcon)
        .setColor("f27e02")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Kicked")
        .setDescription(`${member.user.username} has been kicked by **${bot.user.username}**`)
        .addField("Reason", "5th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been kicked from ${message.guild.name} by **${bot.user.tag}**\n\nReason: 5th Warning (automod)`)
      } catch (e) {
        console.log(e);
      };
      member.kick("5th Warning");
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f27e02")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Kicked")
        .setDescription(`**${member.user.tag}** was kicked by **${bot.user.tag}**`)
        .addField("Reason", "5th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
    };
    //6warns
    if (warns[member.user.id].warns === 6) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(banIcon)
        .setColor("f23030")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`${member.user.username} has been banned for 3 days by **${bot.user.username}**`)
        .addField("Reason", "6th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been banned from ${message.guild.name} for 3 days by **${bot.user.tag}**\n\nReason: 6th Warning (automod)`);
      } catch (e) {
        console.log(e)
      };
      member.ban("6th Warning")
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f23030")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`**${member.user.tag}** was banned for **3 days** by **${bot.user.tag}**`)
        .addField("Reason", "6th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const time = "3d";
      setTimeout(function () {
        guild.unban(member.user.id);
      }, ms(time));
    };
    //7warns
    if (warns[member.user.id].warns === 7) {
      var warn = new Discord.RichEmbed()
        .setThumbnail(banIcon)
        .setColor("f23030")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`${member.user.username} has been banned for 7 days by **${bot.user.username}**`)
        .addField("Reason", "7th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been banned from ${message.guild.name} for 7 days by **${bot.user.tag}**\n\nReason: 7th Warning (automod)`);
      } catch (e) {
        console.log(e)
      };
      member.ban("7th Warning")
      //log it in modlogs
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var wLog = new Discord.RichEmbed()
        .setColor("f23030")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Temp-Banned")
        .setDescription(`**${member.user.tag}** was banned for **7 days** by **${bot.user.tag}**`)
        .addField("Reason", "7th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(wLog);
      const time = "7d";
      setTimeout(function () {
        guild.unban(member.user.id);
      }, ms(time));
    };
    //8warns
    if (warns[member.user.id].warns === 8) {
      var warn = new Discord.RichEmbed()
        .setColor("ce0000")
        .setThumbnail(banIcon)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("User Hard-Banned")
        .setDescription(`${member.user.username} has been hard-banned by **${bot.user.username}**\n\nAll of their message sent in the previous 24 hours have been deleted and the user has been banned.`)
        .addField("Reason", "8th Warning")
      await message.channel.send(member.user, warn);
      try {
        await member.send(`You have been hard-banned from ${message.guild.name} by **${bot.user.tag}**\n\nReason: 8th Warning (automod)`);
      } catch (e) {
        console.log(e);
      };
      await member.ban(1);
      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        return message.channel.send("Failed to parse log to moderation logs channel.");
      };
      var log = new Discord.RichEmbed()
        .setColor("ce0000")
        .setAuthor(member.user.username, member.user.displayAvatarURL)
        .setTitle("User Hard-Banned")
        .setDescription(`**${member.user.tag}** was hard-banned by **${bot.user.tag}**`)
        .addField("Reason", "8th Warning")
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(log);
    };
  };
  //END MODERATION COMMANDS
  //moderation [warn]

  //administrative [sync, delchannel, lockdown*, unlock, prefix, bug, enable/disbale command/module]
  if (command === "makechannel") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete();
      message.channel.send(adminOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`makechannel\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('ADMINISTRATOR')) {
      message.delete();
      return message.channel.send("**Fatal error occurred: Missing `MANAGE_CHANNELS` permission.**");
    };
    const channelType = args[1];
    const channelName = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Incorrect usage. Run `$help makechannel` for help on this command.");
    };
    if (args[1].length < 1) {
      message.delete();
      return message.channel.send("Incorrect usage. Run `$help makechannel` for help on this command.");
    };
    try {
      await message.guild.createChannel(`${channelName}`, `${channelType}`, [], `Created by ${message.author.tag}`);
    } catch (e) {
      message.delete();
      return message.channel.send(`**Fatal error occurred: ${e}**`);
    };
    message.delete();
    let success = new Discord.RichEmbed()
      .setColor("00FF00")
      .setDescription(`Created the ${channelType} channel ( ${channelName} ) successfully.`);
    return message.channel.send(success);
  };
  // if (command === "react") {
  //   message.react("👌");
  //   //let user = message.author;
  //   const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === message.author.id;
  //   if (user.id !== message.author.id) return;
  //   message.awaitReactions(filter, { time: 5000 })
  //     // if (collecte.size === 1) return 
  //     // .then(collected => message.channel.send("yeeeeeeeeeeeet"))
  //     // .catch(console.error);
  //     try {
  //       if (collected.size === 1) return;

  //     }
  // };

  if (command === "fban") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete();
      message.channel.send(adminOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`fban\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('BAN_MEMBERS')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `BAN_MEMBERS` permission.**");
    };
    const id = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send(`**Command ${prefix}fban**\`\`\`\n${prefix}fban [user ID] [reason]\n\`\`\`Force-bans a user via their ID.`);
    };
    var reason = args.slice(1).join(' ');
    if (!reason) reason = "N/A";
    await message.delete();
    try {
      await guild.ban(id, reason);
    } catch (e) {
      return message.channel.send(`**Fatal error occured: ${e}**`);
    };
    bot.fetchUser(id)
      .then((User) => {
        const mName = User.username;
        const mID = User.id;
        const mTag = User.tag;
        const mAV = User.displayAvatarURL;
        var banned = new Discord.RichEmbed()
          .setColor("ff0000")
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`${User.username} has been force banned by **${message.author.username}**`)
          .addField("Reason", reason)
          .setThumbnail("https://images-ext-2.discordapp.net/external/Tiit4dkGjZpEm9ra8ddD2kgvZ4BHcLLT7w1V7NwH0rE/https/cdn.discordapp.com/emojis/368871667881213952.png")
        message.channel.send(`<@!${mID}>`, banned);
        const modLog = message.guild.channels.find("name", settings.modLog);
        var bLog = new Discord.RichEmbed()
          .setColor("ff0000")
          .setAuthor(mName, mAV)
          .setDescription(`**${mTag}** was force banned by **${message.author.tag}**`)
          .addField("Reason", reason)
          .setFooter(moment().format('LLLL'));
        if (!modLog) return message.channel.send("Failed to parse log to moderation logs channel.");
        bot.channels.get(modLog.id).send(bLog)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  if (command === "unban") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete();
      message.channel.send(adminOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`unban\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('ADMINISTRATOR')) {
      message.delete();
      return message.channel.send("**Fatal error occured: Missing `ADMINISTRATOR` permission.**");
    };
    const id = args[0];
    if (!args[0]) {
      message.delete();
      return message.channel.send("Could not parse a user ID.");
    };
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "N/A";
    await message.delete();
    try {
      guild.unban(id, reason)
    } catch (e) {
      return message.channel.send(e);
    };
    //LOL THIS IS SHIT BUT IT WORKS!!!
    bot.fetchUser(id)
      .then((User) => {
        const mName = User.username;
        const mID = User.id;
        const mTag = User.tag;
        const mAV = User.displayAvatarURL;
        var embed = new Discord.RichEmbed()
          .setColor("00FF00")
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .setTitle("User Unbanned")
          .setDescription(`${mName} has been unbanned by **${message.author.username}**`)
          .addField("Reason", reason)
          .setThumbnail("http://www.clker.com/cliparts/I/b/r/1/6/n/simple-green-check-button-md.png")
        message.channel.send(embed);
        const modLog = message.guild.channels.find("name", settings.modLog);
        var uLog = new Discord.RichEmbed()
          .setAuthor(mName, mAV)
          .setColor("00FF00")
          .setDescription(`**${mTag}** was unbannd by **${message.author.tag}**`)
          .addField("Reason", reason)
          .setFooter(moment().format('LLLL'))
        if (!modLog) return message.channel.send("Failed to parse log to moderation logs channel.");
        bot.channels.get(modLog.id).send(uLog)
      })
      .catch((err) => {
        console.log(err)
      })
  };
  // if (command === "lockdown") {
  //   const time = args[0];
  //   if (!args[1]) {
  //     return message.reply("Regular lockdown for" + time);
  //   };
  //   if (args[1] !== "global") {
  //     return message.reply("Regular lockdown for" + time);
  //   };
  //   if (args[1] === "global") {
  //     return message.channel.send("Global lockdown.");
  //   };
  // };
  if (command === "lockdown") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete();
      message.channel.send(adminOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`lockdown\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!guild.me.permissions.has('ADMINISTRATOR')) {
      message.delete();
      return message.channel.send("**Fatal error occurred: Missing `ADMINISTRATOR` permission.**");
    };
    const time = args[0];
    if (!time) {
      message.delete();
      return message.channel.send("Error: Could not parse duration.");
    };
    if (!args[1]) {
      var lock1 = new Discord.RichEmbed()
        .setColor("c46800")
        .setThumbnail("http://iconshow.me/media/images/ui/ios7-icons/png/512/locked_1.png")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`${message.channel} ( #${message.channel.name} ) has been locked for **${ms(ms(time), { long: true })}** by ${message.author.username}\n\n**Only admnistrators may speak.**`)
        .setTitle("Channel Locked")
      message.delete();
      message.channel.send(lock1)
      var unlock1 = new Discord.RichEmbed()
        .setColor("c46800")
        .setTitle(`Channel Unlocked`)
        .setDescription(`${message.channel} ( #${message.channel.name} ) has been unlocked by ${bot.user.username}\n\n**All members can now resume normal activities.**`)
        .setThumbnail("https://d30y9cdsu7xlg0.cloudfront.net/png/1560-200.png")
      await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      });
      setTimeout(function () {
        message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: true
        });
        message.channel.send(unlock1);
      }, ms(time));

      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Error parsing log to moderation logs channel.");
      };
      var log1 = new Discord.RichEmbed()
        .setColor("c46800")
        .setTitle("Channel Locked")
        .setDescription(`**#${message.channel.name}** was locked for **${ms(ms(time), { long: true })}** by **${message.author.username}**`)
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(log1);
      setTimeout(function () {
        var log2 = new Discord.RichEmbed()
          .setColor("c46800")
          .setTitle("Channel Unocked")
          .setDescription(`**#${message.channel.name}** was unlocked by **${bot.user.username}**`)
          .setFooter(moment().format('LLLL'))
        bot.channels.get(modLog.id).send(log2);
      }, ms(time));
      return;
    };
    if (args[1] !== "global") {
      var lock1 = new Discord.RichEmbed()
        .setColor("c46800")
        .setThumbnail("http://iconshow.me/media/images/ui/ios7-icons/png/512/locked_1.png")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`${message.channel} ( #${message.channel.name} ) has been locked for **${ms(ms(time), { long: true })}** by ${message.author.username}\n\n**Only admnistrators may speak.**`)
        .setTitle("Channel Locked")
      message.delete();
      message.channel.send(lock1)
      var unlock1 = new Discord.RichEmbed()
        .setColor("c46800")
        .setTitle(`Channel Unlocked`)
        .setDescription(`${message.channel} ( #${message.channel.name} ) has been unlocked by ${bot.user.username}\n\n**All members can now resume normal activities.**`)
        .setThumbnail("https://d30y9cdsu7xlg0.cloudfront.net/png/1560-200.png")
      await message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      });
      setTimeout(function () {
        message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: true
        });
        message.channel.send(unlock1);
      }, ms(time));

      const modLog = message.guild.channels.find("name", settings.modLog);
      if (!modLog) {
        message.channel.send("Error parsing log to moderation logs channel.");
      };
      var log1 = new Discord.RichEmbed()
        .setColor("c46800")
        .setTitle("Channel Locked")
        .setDescription(`**#${message.channel.name}** was locked for **${ms(ms(time), { long: true })}** by **${message.author.username}**`)
        .setFooter(moment().format('LLLL'))
      bot.channels.get(modLog.id).send(log1);
      setTimeout(function () {
        var log2 = new Discord.RichEmbed()
          .setColor("c46800")
          .setTitle("Channel Unocked")
          .setDescription(`**#${message.channel.name}** was unlocked by **${bot.user.username}**`)
          .setFooter(moment().format('LLLL'))
        bot.channels.get(modLog.id).send(log2);
      }, ms(time));
    };

    if (args[1] === "global") return message.reply("global");
  };
  if (command === "alert") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete();
      message.channels.send(adminOnly);
      bot.channels.get(mLogged.id).send(`**${message.author.tag}** attempted to use the \`alert\` command in ${message.channel}`);
      if (!mLogged) return;
      return;
    };
    if (!args[0]) {
      let hvwarn = new Discord.RichEmbed()
        .setColor("0f6ec6")
        .setAuthor(`Comamnd ${prefix}alert`, bot.user.displayAvatarURL)
        .addField("Description", "Sends an alert to the current channel, optional `@here` or `@everyone` tags.")
        .addField("Usage", `__Regular Alert__\n${prefix}alert regular <alert>\n\n__@here Alert__\n${prefix}alert here <alert>\n\n__@everyone Alert__\n${prefix}alert everyone <alert>`)
        .addField("Permissions Required", "`ADMINISTRATOR`")
      message.delete();
      return message.channel.send(hvwarn);
    };
    if (args[0] === "regular") {
      // let channel = message.mentions.channels.first();
      // if (!channel) channel = message.channel;
      const reason = args.slice(1).join(' ');
      if (reason.length < 1) {
        message.delete();
        return message.channel.send("Error: Could not parse description.");
      };
      let alertR = new Discord.RichEmbed()
        .setColor("ff5454")
        .setThumbnail("https://images-ext-1.discordapp.net/external/m5Br1I_tmtD1uz1SmJNQdyTdEUeFI-UXSPsPJXmFuLM/http/www.freeiconspng.com/uploads/alert-icon-red-11.png")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setTitle("Alert Issued")
        .setDescription(`An alert for this server or channel has been issued by ${message.author.username}`)
        .addField("Description", reason)
      await message.delete();
      await message.channel.send(alertR);
      return;
    };
    if (args[0] === "here") {
      const reason = args.slice(1).join(' ');
      if (reason.length < 1) {
        message.delete();
        return message.channel.send("Error: Could not parse description.");
      };
      let alertR = new Discord.RichEmbed()
        .setColor("ff5454")
        .setThumbnail("https://images-ext-1.discordapp.net/external/m5Br1I_tmtD1uz1SmJNQdyTdEUeFI-UXSPsPJXmFuLM/http/www.freeiconspng.com/uploads/alert-icon-red-11.png")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setTitle("Alert Issued")
        .setDescription(`An alert for this server or channel has been issued by ${message.author.username}`)
        .addField("Description", reason)
      await message.delete();
      await message.channel.send("@here", alertR);
      return;
    };
    if (args[0] === "everyone") {
      const reason = args.slice(1).join(' ');
      if (reason.length < 1) {
        message.delete();
        return message.channel.send("Error: Could not parse description.");
      };
      let alertR = new Discord.RichEmbed()
        .setColor("ff5454")
        .setThumbnail("https://images-ext-1.discordapp.net/external/m5Br1I_tmtD1uz1SmJNQdyTdEUeFI-UXSPsPJXmFuLM/http/www.freeiconspng.com/uploads/alert-icon-red-11.png")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setTitle("Alert Issued")
        .setDescription(`An alert for this server or channel has been issued by ${message.author.username}`)
        .addField("Description", reason)
      await message.delete();
      await message.channel.send("@everyone", alertR);
      return;
    };
  };
  ///END ADMIN COMMANDS
  //administrative [sync, alert, delchannel, makechannel, lockdown, unlock, prefix, bug, enable/disbale command/module]

  //(mod) games + misc [gstar, bstar, cookie, icecream, slap, hit, punch]

  //games + misc [roll, flip, 8ball]

  //utility [emind, rpoll, user, channel, emote, guild, cat, dog]
  if (command === "poll") {
    let question = args.slice(0).join(' ');
    if (question.length < 1) {
      message.delete();
      return message.channel.send("Error: Could not parse question.");
    };
    await message.delete();
    let qpoll = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTitle("Poll Started")
      .setDescription(`${message.author.username} has started a poll in ${message.channel} ( #${message.channel.name} ) `)
      .addField("Question", question)
    message.channel.send(qpoll)
      .then(function (message) {
        message.react("👍");
        message.react("🤷");
        message.react("👎");
      });
  };
  if (command === "report") {
    if (!args[0]) {
      message.delete();
      //help message 
    };
    let reportsChannel = message.guild.channels.find("name", settings.reportsChannel);
    if (!reportsChannel) {
      message.delete();
      return message.channel.send(":x: **|** No reports channel was set, or it could not be found.");
    };
    const member = message.mentions.members.first();
    if (!member) {
      message.delete();
      return message.channel.send(`Error: Could not parse either a user mention. (Run \`${prefix}help report\` for help.)`);
    };
    const proof = args[1];
    if (!proof) {
      message.delete();
      return message.channel.send(`Error: Could not parse argument 'proof'. (Run \`${prefix}help report\` for help.)\n\nNote: proof should be a link to an image containg proof of what your are reporting.`);
    };
    const reason = args.slice(2).join(' ');
    if (reason.length < 1) {
      message.delete();
      return message.channel.send(`Error: Could not parse reason. (Run \`${prefix}help report\` for help.)`);
    };
    await message.delete();
    await message.channel.send("Sending...").then(message => message.edit("Report sent successfully."));
    var reported = new Discord.RichEmbed()
      .setColor("2ab741")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTitle("New Report")
      .addField("Reported By", `${message.author.tag} ( ${message.author.id} )`)
      .addField("User Reported", `${member.user.username} ( ${member.user.id} )`)
      .addField("Proof", proof)
      .addField("Reason", reason)
      .addField("Reported In", `#${message.channel.name}`)
      .setFooter(`Reported at: ${moment().format('LLLL')}`)
      .setThumbnail(message.author.displayAvatarURL);
    bot.channels.get(reportsChannel.id).send("<@&421099417664487447>, A new report has been sent in:", reported);
  };
  if (command === "emote") {
    let emote = args[0];
    let emoji = message.guild.emojis.find("name", args[0]);

    const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .addField("Animated", emoji.animated)
      .addField("Created At", emoji.createdAt)
      .addField("ID", emoji.id)
      .addField("Name", emoji.name)
    message.channel.send(embed);
  };
  if (command === "set") {
    const role = message.guild.roles.find("name", "@everyone");
    await role.setPermissions(['SEND_MESSAGES', 'ADD_REACTIONS'])
    return message.reply("set")
  };
  if (command === "user") {
    var member = message.mentions.members.first();
    if (!member) member = message.member;
    var status = member.user.presence.status;
    if (status === "offline") status === "Invisible"
    var isbot = member.user.bot ? ":white_check_mark:" : ":x:";
    var user = new Discord.RichEmbed()
      .setThumbnail(member.user.displayAvatarURL)
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .addField(`Username`, member.user.username, true)
      .addField(`Discriminator`, member.user.discriminator, true)
      .addField("User ID", member.user.id)
      .addField("Nickname", member.user.nickname)
      .addField("Status", status)
      .addField("Bot?", isbot)
      .addField("Account Created At", member.user.createdAt)
      .addField("Server Roles", member.roles.map(r => r.name).join(', '))
    message.channel.send("Gathering...").then(message => message.edit(user));
  };
  if (command === "channel") {
    var channel = message.mentions.channels.first();
    if (!channel) channel = message.channel;
    var type = (channel.type === "text") ? "⌨" : "🔈"
    var ew = (channel.type === "nsfw") ? "Yes" : "No"
    var info = new Discord.RichEmbed()
      .setTitle(`Information for #${channel.name}`)
      .addField("Channel Name", `${message.channel} ( ${message.channel.name} )`)
      .addField("Type", type)
      .addField("NSFW?", ew)
      .addField("Created At", channel.createdAt)
    message.channel.send("***Gathering...***").then(message => message.edit(info));
  };
  if (command === "advice") {
    let advice = ["Plant a tree", "If you have grandparents or parents - Talk to them more. Ask them about their life experiences.", "Have a firm handshake", "Good advice is something a man gives when he is too old to set a bad example"]
    let result = advice[Math.floor(Math.random() * advice.length)];
    var doggo = new Discord.RichEmbed()
      .setColor("d37013")
      .setDescription(`${result}`)
    message.channel.startTyping();
    setTimeout(function () {
      message.channel.send(doggo);
      message.channel.stopTyping()
    }, (1000))
  };
  //dev only [game, status, eval, disconnect, leave guild <name>id> <name|id>]
  if (command === "game") {
    if (message.author.id !== settings.devID) {
      var notdev = new Discord.RichEmbed()
        .setColor("ff0000")
        .setDescription(":warning: **Developer only.**")
      message.delete();
      return message.channel.send(notdev);
    };
    let type = args[0];
    let game = args.slice(1).join(' ');
    if (!type) game = null;
    try {
      bot.user.setActivity(`${game}`, { type: `${type}` });
    } catch (e) {
      return message.channel.send(e);
    };
    message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Success!")
      .setDescription(`I am now ${type} ${game}!`);
    message.channel.send(done);
  };
  //
  if (command === "status") {
    if (message.author.id !== settings.devID) {
      var notdev = new Discord.RichEmbed()
        .setColor("ff0000")
        .setDescription(":warning: **Developer only.**")
      message.delete();
      return message.channel.send(notdev);
    };
    let status = args[0];
    try {
      await bot.user.setStatus(status)
    } catch (e) {
      return message.channel.send(e);
    };
    message.delete();
    var done = new Discord.RichEmbed()
      .setColor("00FF00")
      .setTitle("Success!")
      .setDescription(`I am showing as ${status}!`);
    message.channel.send(done);
  };
  //
  if (command === "eval") {
    var notdev = new Discord.RichEmbed()
      .setColor("ff0000")
      .setDescription(":warning: **Developer only.**")
    if (message.author.id !== settings.devID) return message.channel.send(notdev);
    const guild = message.guild;
    const content = message.content.split(' ').slice(1).join(' ');
    const result = new Promise((resolve, reject) => resolve(eval(content)));

    return result.then(output => {
      if (typeof output !== 'string') output = require('util').inspect(output, {
        depth: 0
      });
      if (output.includes(settings.token)) output = output.replace(settings.token, '[INSERT TOKEN HERE]');
      var toolong = new Discord.RichEmbed()
        .setColor("e7ea3c")
        .setTitle("Eval Success")
        .setDescription(`:warning: **Length too long, check console.**`)
      if (output.length > 1000) return console.log(output), message.channel.send(toolong);
      return message.channel.send(output, { code: 'js' });
    }).catch(err => {
      console.error(err);
      err = err.toString();

      if (err.includes(settings.token)) err = err.replace(settings.token, 'Not for your eyes');
      // //whopps
      // const eror = (err, {code: 'js'})
      // var oops = new Discod.RichEmbed()
      //   .setColor("ff0000")
      //   .setTitle("Eval Fail")
      //   .setDescription(`\`\`\`\n${eror}\n\`\`\``)
      return message.channel.send(err, { code: 'js' });
    });
  };
  //help on commands
  if (command === "help") {
    if (!args[0]) {
      return;
    };
    if (args[0] === "report") {
      let hreport = new Discord.RichEmbed()
        .setColor(helpColor)
        .setAuthor(`Command ${prefix}report`, bot.user.displayAvatarURL)
        .addField("Description", "Sends a report to the server's moderation team about another user in the server.")
        .addField("Usage", `${prefix}report <@user> [proof] [reason]`)
        .addField("Permissions Required", "`NONE`")
        .addField("Notes", "Example report: https://gyazo.com/568bcf860c2a401e5490d1b184e177da")
      return message.channel.send(hreport);
    };
    if (args[0] === "vwarn") {
      let hvwarn = new Discord.RichEmbed()
        .setColor("0f6ec6")
        .setAuthor(`Comamnd ${prefix}vwarn`, bot.user.displayAvatarURL)
        .addField("Description", "Verbally warns a user.")
        .addField("Usage", `${prefix}vwarn <@user> [reason]`)
        .addField("Permissions Required", "`KICK_MEMBERS`")
      return message.channel.send(hvwarn);
    };
    if (args[0] === "warn") {
      let help = new Discord.RichEmbed()
        .setColor("0f6ec6")
        .setAuthor(`Command ${prefix}warn`, bot.user.displayAvatarURL)
        .addField("Description", "Warns a user, if the user reaches a certain ammount of warns the auto warn-punish will take effect (if enabled)")
        .addField("Usage", `${prefix}warn <@user> [reason]`)
        .addField("Permissions Required", "`KICK_MEMBERS`")
      return message.channel.send(help);
    };
  };
if (command === "hwarn") {
  let member = message.mentions.members.first();
  if (!member) member = args[0];
  try {
    await message.guild.members.get(member.user.id);
  }catch(e){
    return message.channel.send(e);
  };
  return message.channel.send(`<@!${member.user.id}> has been warned!`);
};
  //owner only
  if (command === "settings") {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.delete();
      return message.channel.send(adminOnly);
    };
    if (args[0] === "prefix") {
      // let newPrefix = message.content.split(" ").slice(1, 2)[0];
      let newPrefix = args[1];

      if (!newPrefix) {
        message.delete();
        return message.channel.send("Error: Could not parse new prefix.")
      };
      if (newPrefix.length >= 10) {
        message.delete();
        return message.channel.send(`Woah there, \`${args[1]}\` is quite a long prefix, don't ya think? Try something with less characters.`);
      };
      var succesPrefix = new Discord.RichEmbed()
        .setColor("00ff00")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`${message.author.username}, set the new prefix successfully.`)
        .addField("New Prefix", `${newPrefix}`)
      await message.delete();
      settings.prefix = newPrefix;
      await fs.writeFile("./settings.json", JSON.stringify(settings), (err) => console.error)
      await message.channel.send(succesPrefix);
    };
    if (args[0] === "muterole") {
      const newMRole = args.slice(1).join(' ');
      let role = message.guild.roles.find("name", newMRole);
      if (!role) {
        message.delete();
        return message.channel.send("That roles does not appear to exist on this guild.");
      };
      settings.muteRole = newMRole;
      await message.delete();
      try {
        fs.writeFile("./settings.json", JSON.stringify(settings), (err) => console.error);
      } catch (e) {
        return message.channel.send(e);
      };
      var success = new Discord.RichEmbed()
        .setColor("00FF00")
        .setTitle("Success!")
        .setDescription(`${message.author.username}, successfully updated the muteRole for ${message.guild.name}`)
        .addField("New muteRole", newMRole);
      message.channel.send(success);
      return;
    };
    // if (args[0] === "modlog") {
    // let channel = args[1];
    // let nChannel = message.guild.channels.find("name", channel)
    // if (!nChannel) return message.channel.send("Invalid channel.")

    // settings.modLog = channel;
    //   await fs.writeFile("./settings.json", JSON.stringify(settings), (err) => console.error)
    // return message.channel.send(":ok_hand:");
    // };
    if (args[0] === "modlog") {
      let channel = message.mentions.channels.first();
      if (!channel) {
        message.delete();
        return message.channel.send("Error: No channel mentioned.");
      };
      let nChannel = message.guild.channels.find("name", channel.name);
      if (!nChannel) {
        message.delete();
        return message.channel.send(`Error: The channel '${channel.name}' does not appear to exist.`);
      };
      settings.modLog = channel.name;
      await fs.writeFile("./settings.json", JSON.stringify(settings), err => console.error);
      let success = new Discord.RichEmbed()
        .setColor("00ff00")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`${message.author.username}, updated the moderation-logs channel successfully.`)
        .addField("New Moderation-Logs Channel", channel.name)
      message.delete();
      return message.channel.send(success);
    };
  };
  if (command === "ping") {
    if (commandstatus.ping === "disabled") return message.channel.send("<:bbX:406718200793792513> Command currently disabled.");
    const then = Date.now();
    message.channel.send(":stopwatch: ***Pinging...***")
      .then(message => {
        message.edit(`Pong! It took me **${Date.now() - then}**ms to send that message.\n\n:heartbeat: Discord Hearbeat: ${Math.floor(bot.ping)}ms`);
      });
  };
  if (command === "dog") {
    let { body } = await superagent
      .get(`https://random.dog/woof.json`);
    var doggo = new Discord.RichEmbed()
      .setImage(body.url)
      .setColor("d37013")
      .setTitle(":dog: Woof, woof! :dog:")
      .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
    message.channel.send(doggo);
    message.channel.startTyping();
    setTimeout(function () {
      message.channel.send(kitty)
      message.channel.stopTyping()
    }, (1000))
  };
  if (command === "cat") {
    let { body } = await superagent
      .get(`http://random.cat/meow`);
    var kitty = new Discord.RichEmbed()
      .setImage(body.file)
      .setColor("d37013")
      .setTitle(":cat: Meow! :cat:")
      .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
    //message.channel.send(kitty);
    message.channel.startTyping();
    setTimeout(function () {
      message.channel.send(kitty)
      message.channel.stopTyping()
    }, (1000))
  };
});
bot.login(settings.token);
