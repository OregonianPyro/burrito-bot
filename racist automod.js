const Discord = require("discord.js")
module.exports.run = (bot, message, args) => {
if(racistWords.some(word => message.content.toLowerCase().includes(word)) ) {
let member = message.author
var racistBitch = new Discord.RichEmbed()
.setTitle("Warning Issued")
.setColor("2662b6")
.setAuthor("BurritoBot", "https://cdn.discordapp.com/attachments/398222190060765190/404100800940343306/czb2.jpg")
.setDescription(`${message.author.username} has been warned by **BurritoBot**\n\nPlease read over the server rules and familiarize yourself with them!`)
.addField("Reason", `Racial Slurs (Automod)`)
.setThumbnail("https://images-ext-1.discordapp.net/external/lvduUIA3lQadDy2LrZdfcwIV6I9ue00x4h8Qmp4lN2k/https/upload.wikimedia.org/wikipedia/commons/thumb/2/26/Nuvola_apps_important_blue.svg/180px-Nuvola_apps_important_blue.svg.png")
.setFooter("BurritoBot Auto-Moderation")
message.channel.send(`${message.author}`, racistBitch)
    var warningLog = new Discord.RichEmbed()
        .setColor("2662b6")
        .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
        .setTitle("Warning")
        .addField("Moderator", `BurritoBot`, true)
        .addField("User", `${message.author.tag}`, true)
        .addField("User ID", `${message.author.id}`, true)
        .addField("Reason", `Racial Slurs (Automod)`, true)
        .setFooter(`BurritoBot (394248379850424320)`, "https://cdn.discordapp.com/attachments/398222190060765190/404100800940343306/czb2.jpg")
        .setTimestamp()
    message.delete()
    const warnLog = message.guild.channels.find("name", "burritbot-modlogs")
    if (!warnLog) return;
    bot.channels.get(warnLog.id).send(warningLog)
    if (!warns[message.author.id]) warns[message.author.id] = {
      warns: 0
    };
      warns[message.author.id].warns++;
      fs.writeFile("./warnings.json", JSON.stringify(warns));
//3 warns, 1d mute
  if (warns[message.author.id].warns == 3) {
    var mute = new Discord.RichEmbed()
        .setColor("000305")
        .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
        .setTitle("User Muted")
        .setDescription(`${message.author.username} has been muted for 24 hours by **BurritoBot**`)
        .addField("Reason", `3rd Warning`)
        .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
    let logs = message.guild.channels.find("name", "mod-logs");
    if (!logs) return;
    var muteLog = new Discord.RichEmbed()
        .setColor("000305")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle("User Muted")
        .addField("Moderator", `BurritoBot`, true)
        .addField("User", `${message.author.tag}`, true)
        .addField("User ID", `${message.author.id}`,true)
        .addField("Duration", `24 hours`)
        .addField("Reason", `3rd Warning (Automod)`)
        .setFooter(`BurritoBot`, "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
        .setTimestamp()
  await message.channel.send(`${message.author}`, mute);
  let muteRole = message.guild.roles.find("name", "Muted")
  await member.addRole(muteRole.id);
  await bot.channels.get(logs.id).send(muteLog);
  let time = ("1d");
  setTimeout(function() {
    member.removeRole(muteRole.id)
    }, ms(time));
  };
//4 warns, 3d mute
if (warns[member.id].warns == 4) {
  var mute = new Discord.RichEmbed()
      .setColor("000305")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Muted")
      .setDescription(`${message.author.username} has been muted for 3 days by **BurritoBot**`)
      .addField("Reason", `4th Warning`)
      .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
  let logs = message.guild.channels.find("name", "burritobot-modlogs");
  if (!logs) return;
  var muteLog = new Discord.RichEmbed()
      .setColor("000305")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Muted")
      .addField("Moderator", `BurritoBot`, true)
      .addField("User", `${message.author.tag}`, true)
      .addField("User ID", `${message.author.id}`,true)
      .addField("Duration", `3 days`)
      .addField("Reason", `4th Warning (Automod)`)
      .setFooter(`BurritoBot`, "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
await message.channel.send(`${message.author}`, mute);
let muteRole = message.guild.roles.find("name", "Muted")
await member.addRole(muteRole.id);
await bot.channels.get(logs.id).send(muteLog);
let time = ("3d");
setTimeout(function() {
  member.removeRole(muteRole.id)
  }, ms(time));
};
//5 warns, kick
if (warns[member.id].warns == 5) {
  var tban = new Discord.RichEmbed()
      .setColor("f27e02")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Kicked")
      .setDescription(`${message.author.username} has been kicked by **BurritoBot**`)
      .addField("Reason", "5th Warning")
      .setThumbnail("https://cdn.discordapp.com/emojis/365790858890444802.png?")
  var tLog = new Discord.RichEmbed()
      .setColor("f27e02")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Kicked")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${message.author.tag}`, true)
      .addField("User ID", `${message.author.id}`, true)
      .addField("Reason", `5th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been kicked from ${message.guild.name} by **BurritoBot#9866**. (Reason: 5th Warning)\n\n:warning: \`You can join back with a valid invite link.\``);
  await message.channel.send(`${message.author}`, tban);
  await member.kick(`5th Warning - Automod`)
let modlog = message.guild.channels.find("name", "burritobot-modlog");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);
};
//6 warns, 3d ban
/*if (warns[member.id].warns == 6) {
  var tban = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Temp-Banned")
      .setDescription(`${member.user.username} has been temp-banned for 3 days by **BurritoBot**`)
      .addField("Reason", "6th Warning")
      .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
  var tLog = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor(member.user.username, member.user.avatarURL)
      .setTitle("User Temp-Banned")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${member.user.tag}`, true)
      .addField("User ID", `${member.user.id}`, true)
      .addField("Duration", `6 days`)
      .addField("Reason", `6th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 6th Warning)\n\nDuration: 3 days`)
  await message.channel.send(`${member.user}`, tban);
  await member.ban(`6th Warning - Automod`)
  let time = ("3d");
  setTimeout(function () {
  guild.unban(id)
}, ms(time));
let modlog = message.guild.channels.find("name", "burritobot-modlog");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);
};
//7 warns, 7d ban
if (warns[member.id].warns == 7) {
  var tban = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Temp-Banned")
      .setDescription(`${member.user.username} has been temp-banned for 7 days by **BurritoBot**`)
      .addField("Reason", "7th Warning")
      .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
  var tLog = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor(member.user.username, member.user.avatarURL)
      .setTitle("User Temp-Banned")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${member.user.tag}`, true)
      .addField("User ID", `${member.user.id}`, true)
      .addField("Duration", `7 days`)
      .addField("Reason", `7th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 7th Warning)\n\nDuration: 7 days`)
  await message.channel.send(`${member.user}`, tban);
  await member.ban(`6th Warning - Automod`)
  let time = ("7d");
  setTimeout(function () {
  guild.unban(id)
}, ms(time));
let modlog = message.guild.channels.find("name", "burritobot-modlog");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);
};
//8 warns, hban
if (warns[member.id].warns == 8) {
  var tban = new Discord.RichEmbed()
      .setColor("b70000")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Hard-Banned")
      .setDescription(`${member.user.username} has been hard-banned by **BurritoBot**\n\nAll of their messages sent in the previous 24 hours have been deleted and the user has been banned.`)
      .addField("Reason", "8th Warning")
      .setThumbnail("http://weclipart.com/gimg/64286F2FE1B49E0B/di8ojobyT.png")
  var tLog = new Discord.RichEmbed()
      .setColor("b70000")
      .setAuthor(member.user.username, member.user.avatarURL)
      .setTitle("User Hard-Banned")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${member.user.tag}`, true)
      .addField("User ID", `${member.user.id}`, true)
      .addField("Reason", `8th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been hard-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 8th Warning)`)
  await message.channel.send(`${member.user}`, tban);
  await member.ban(1);
let modlog = message.guild.channels.find("name", "burritobot-modlog");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);*/const Discord = require("discord.js");

}

module.exports.help = {
  name: "racist-automod"
}
/*
if (warns[member.id].warns == 5) {
  const member = message.member;
  var tban = new Discord.RichEmbed()
      .setColor("f27e02")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Kicked")
      .setDescription(`${message.author.username} has been kicked by **BurritoBot**`)
      .addField("Reason", "5th Warning")
      .setThumbnail("https://cdn.discordapp.com/emojis/365790858890444802.png?")
  var tLog = new Discord.RichEmbed()
      .setColor("f27e02")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Kicked")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${message.author.tag}`, true)
      .addField("User ID", `${message.author.id}`, true)
      .addField("Reason", `5th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been kicked from ${message.guild.name} by **BurritoBot#9866**. (Reason: 5th Warning)\n\n:warning: \`You can join back with a valid invite link.\``);
  await message.channel.send(`${message.author}`, tban);
  await member.kick(`5th Warning - Automod`)
let modlog = message.guild.channels.find("name", "burritobot-modlogs");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);
};
//6 warns, 3d ban
if (warns[member.id].warns == 6) {
  const member = message.member;
  var tban = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Temp-Banned")
      .setDescription(`${message.author.username} has been temp-banned for 3 days by **BurritoBot**`)
      .addField("Reason", "6th Warning")
      .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
  var tLog = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Temp-Banned")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${message.author.tag}`, true)
      .addField("User ID", `${message.author.id}`, true)
      .addField("Duration", `6 days`)
      .addField("Reason", `6th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 6th Warning)\n\nDuration: 3 days`)
  await message.channel.send(`${message.author}`, tban);
  await member.ban(`6th Warning - Automod`)
  let time = ("3d");
  setTimeout(function () {
  guild.unban(id)
}, ms(time));
let modlog = message.guild.channels.find("name", "burritobot-modlogs");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);
};
//7 warns, 7d ban
if (warns[member.id].warns == 7) {
  const member = message.member;
  var tban = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Temp-Banned")
      .setDescription(`${message.authorr.username} has been temp-banned for 7 days by **BurritoBot**`)
      .addField("Reason", "7th Warning")
      .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
  var tLog = new Discord.RichEmbed()
      .setColor("ff3232")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Temp-Banned")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${message.author.tag}`, true)
      .addField("User ID", `${message.author.id}`, true)
      .addField("Duration", `7 days`)
      .addField("Reason", `7th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 7th Warning)\n\nDuration: 7 days`)
  await message.channel.send(`${message.author}`, tban);
  await member.ban(`6th Warning - Automod`)
  let time = ("7d");
  setTimeout(function () {
  guild.unban(id)
}, ms(time));
let modlog = message.guild.channels.find("name", "burritobot-modlogs");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);
};
//8 warns, hban
if (warns[member.id].warns == 8) {
  const member = message.member;
  var tban = new Discord.RichEmbed()
      .setColor("b70000")
      .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTitle("User Hard-Banned")
      .setDescription(`${message.author.username} has been hard-banned by **BurritoBot**\n\nAll of their messages sent in the previous 24 hours have been deleted and the user has been banned.`)
      .addField("Reason", "8th Warning")
      .setThumbnail("http://weclipart.com/gimg/64286F2FE1B49E0B/di8ojobyT.png")
  var tLog = new Discord.RichEmbed()
      .setColor("b70000")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Hard-Banned")
      .addField("Moderator", "BurritoBot", true)
      .addField("User", `${message.author.tag}`, true)
      .addField("User ID", `${message.author.id}`, true)
      .addField("Reason", `8th Warning (Automod)`)
      .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
      .setTimestamp()
  await member.send(`You have been hard-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 8th Warning)`)
  await message.channel.send(`${message.author}`, tban);
  await member.ban(1);
let modlog = message.guild.channels.find("name", "burritobot-modlogs");
if (!modlog) return;
bot.channels.get(modlog.id).send(tLog);
};
