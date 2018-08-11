const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require("./settings.json");
//const moderationRecords = require("./moderation.json");
const fs = require("fs");
const ms = require("ms");
const discordSpam = ["@everyone look out for the user", "Look out for the user", "@everyone - discord team", "- discord team", "we are working to remove this user", "do not accept his friend request"]
//const moderationLogs = message.guild.channels.find("name", "mod-logs")
const curseWords = ["fuck", "shit", "bitch", "motherfucker", "mother fucker", "mofo", "shiet", "biotch", "god damn it", "damn", "damn it", "lil bitch"];
const racistWords = ["nigga","ni:regional_indicator_b: :regional_indicator_b:er", "Ñįģger", "nigger", "nibba", "niga", "niger", "niggaa", "nigerr", "nibber", "ni🅱🅱er", "n.i.g.g.a.", "n.i.g.g.a", "n.i.g.g.e.r.", "n.i.g.g.e.r.", "n.i.g.e.r", "niber", "niba", ];
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});
bot.on("ready", () => {
  console.log(`BETA BOT is online on ${bot.guilds.size} servers!`)});

 // bot.user.setPresence({status: 'dnd', watching: {name: `help for commands`, type: 0}});
const prefix = (settings.prefix);

bot.on("message", async message => {
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length).toLowerCase();

  let args = message.content.split(" ").slice(1);
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("Are you really that lonely you're trying to talk to a bot?")
//automod?
if (discordSpam.some(word => message.content.toLowerCase().includes(word)) ) {
  message.reply("FAKE DISCORD SPAM!!!")
  message.delete();
};
//mass-tagging-@everyone-2m-automod-mute
if (message.content.includes("@everyone @everyone @everyone @everyone @everyone @everyone")) {
  let member = message.member
  var spamMute = new Discord.RichEmbed()
  .setColor("000305")
  .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  .setTitle("User Muted")
  .setDescription(`${message.author.username} has been muted for 2 minutes by **BurritoBot**`)
  .addField("Reason", "Mass Spamming `@everone`")
  .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
var muteLog = new Discord.RichEmbed()
  .setColor("000305")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle("User Muted")
  .addField("Moderator", `BurritoBot`, true)
    .addField("User", `${message.author.tag}`, true)
  .addField("User ID", `${message.author.id}`,true)
  .addField("Duration", `2 minutes`)
  .addField("Reason", "Mass Spamming `@everone`")
  .setFooter(`BurritoBot#9866 (394248379850424320)`, `https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg`)
  .setTimestamp()
await message.delete();
let muteRole = message.guild.roles.find("name", "Muted")
if (!muteRole) return;
await message.channel.send(`${message.author}`, spamMute);
await member.addRole(muteRole.id);
let modLog = message.guild.channels.find("name", "burritobot-modlogs");
if (!modLog) return;
await bot.channels.get(modLog.id).send(muteLog);
await message.channel.send(`<@&378326973224583178>, ${message.author} appears to be spamming @|everyone!`);
setTimeout(function () {
  member.removeRole(muteRole.id);
//  message.channel.send(`${member.user} has been released from the prison we call MuteVille.`);
}, (120000));
};

if (message.content.includes("discord.gg/")) {
  //  if (message.member.permissions.has('KICK_MEMBERS')) return message.reply("You're lucky you're a moderator :wink:");
/*  if (message.author.id === "312358298667974656") return;
  if (message.author.id === "257401233466195968") return;*/
//  if (message.channel.id === "402252445134356481") return;
  var noAdvert = new Discord.RichEmbed()
                    .setTitle("Warning Issued")
                    .setColor("2662b6")
                    .setAuthor("BurritoBot", "https://cdn.discordapp.com/attachments/398222190060765190/404100800940343306/czb2.jpg")
                    .setDescription(`${message.author.username} has been warned by **BurritoBot**\n\nPlease read over the server rules and familiarize yourself with them!`)
                    .addField("Reason", `Advertising`)
                    .setThumbnail("https://images-ext-1.discordapp.net/external/lvduUIA3lQadDy2LrZdfcwIV6I9ue00x4h8Qmp4lN2k/https/upload.wikimedia.org/wikipedia/commons/thumb/2/26/Nuvola_apps_important_blue.svg/180px-Nuvola_apps_important_blue.svg.png")
                    .setFooter("BurritoBot Auto-Moderation")
                    message.channel.send(`${message.author}`, noAdvert)
                    message.delete()
                   const modLogChannel =  message.guild.channels.find("name", "mod-logs")
                    if (!moderationLogs) return;
                        var warningLog = new Discord.RichEmbed()
                            .setColor("2662b6")
                            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
                            .setTitle("Warning")
                            .addField("Moderator", `BurritoBot`, true)
                            .addField("User", `${message.author.tag}`, true)
                            .addField("User ID", `${message.author.id}`, true)
                            .addField("Reason", `Advertising`, true)
                            .setFooter(`BurritoBot (394248379850424320)`, "https://cdn.discordapp.com/attachments/398222190060765190/404100800940343306/czb2.jpg")
                            .setTimestamp()
                            bot.channels.get(moderationLogs.id).send(warningLog);
};
                        //3 warns, 1d mute
                        //   if (warns[member.id].warns == 3) {
                        //     var mute = new Discord.RichEmbed()
                        //         .setColor("000305")
                        //         .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //         .setTitle("User Muted")
                        //         .setDescription(`${member.user.username} has been muted for 24 hours by **BurritoBot**`)
                        //         .addField("Reason", `3rd Warning`)
                        //         .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
                        //     let logs = message.guild.channels.find("name", "burritobot-modlogs");
                        //     if (!logs) return;
                        //     var muteLog = new Discord.RichEmbed()
                        //         .setColor("000305")
                        //         .setAuthor(member.user.username, member.user.avatarURL)
                        //         .setTitle("User Muted")
                        //         .addField("Moderator", `BurritoBot`, true)
                        //         .addField("User", `${member.user.tag}`, true)
                        //         .addField("User ID", `${member.user.id}`,true)
                        //         .addField("Duration", `24 hours`)
                        //         .addField("Reason", `3rd Warning (Automod)`)
                        //         .setFooter(`BurritoBot`, "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //         .setTimestamp()
                        //   await message.channel.send(`${member.user}`, mute);
                        //   let muteRole = message.guild.roles.find("name", "Muted")
                        //   await member.addRole(muteRole.id);
                        //   await bot.channels.get(logs.id).send(muteLog);
                        //   let time = ("1d");
                        //   setTimeout(function() {
                        //     member.removeRole(muteRole.id)
                        //     }, ms(time));
                        //   };
                        // //4 warns, 3d mute
                        // if (warns[member.id].warns == 4) {
                        //   var mute = new Discord.RichEmbed()
                        //       .setColor("000305")
                        //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTitle("User Muted")
                        //       .setDescription(`${member.user.username} has been muted for 3 days by **BurritoBot**`)
                        //       .addField("Reason", `4th Warning`)
                        //       .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
                        //   let logs = message.guild.channels.find("name", "burritobot-modlogs");
                        //   if (!logs) return;
                        //   var muteLog = new Discord.RichEmbed()
                        //       .setColor("000305")
                        //       .setAuthor(member.user.username, member.user.avatarURL)
                        //       .setTitle("User Muted")
                        //       .addField("Moderator", `BurritoBot`, true)
                        //       .addField("User", `${member.user.tag}`, true)
                        //       .addField("User ID", `${member.user.id}`,true)
                        //       .addField("Duration", `3 days`)
                        //       .addField("Reason", `4th Warning (Automod)`)
                        //       .setFooter(`BurritoBot`, "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTimestamp()
                        // await message.channel.send(`${member.user}`, mute);
                        // let muteRole = message.guild.roles.find("name", "Muted")
                        // await member.addRole(muteRole.id);
                        // await bot.channels.get(logs.id).send(muteLog);
                        // let time = ("3d");
                        // setTimeout(function() {
                        //   member.removeRole(muteRole.id)
                        //   }, ms(time));
                        // };
                        // //5 warns, kick
                        // if (warns[member.id].warns == 5) {
                        //   var tban = new Discord.RichEmbed()
                        //       .setColor("f27e02")
                        //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTitle("User Kicked")
                        //       .setDescription(`${member.user.username} has been kicked by **BurritoBot**`)
                        //       .addField("Reason", "5th Warning")
                        //       .setThumbnail("https://cdn.discordapp.com/emojis/365790858890444802.png?")
                        //   var tLog = new Discord.RichEmbed()
                        //       .setColor("f27e02")
                        //       .setAuthor(member.user.username, member.user.avatarURL)
                        //       .setTitle("User Kicked")
                        //       .addField("Moderator", "BurritoBot", true)
                        //       .addField("User", `${member.user.tag}`, true)
                        //       .addField("User ID", `${member.user.id}`, true)
                        //       .addField("Reason", `5th Warning (Automod)`)
                        //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTimestamp()
                        //   await member.send(`You have been kicked from ${message.guild.name} by **BurritoBot#9866**. (Reason: 5th Warning)\n\n:warning: \`You can join back with a valid invite link.\``);
                        //   await message.channel.send(`${member.user}`, tban);
                        //   await member.kick(`5th Warning - Automod`)
                        // let modlog = message.guild.channels.find("name", "burritobot-modlog");
                        // if (!modlog) return;
                        // bot.channels.get(modlog.id).send(tLog);
                        // };
                        // //6 warns, 3d ban
                        // if (warns[member.id].warns == 6) {
                        //   var tban = new Discord.RichEmbed()
                        //       .setColor("ff3232")
                        //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTitle("User Temp-Banned")
                        //       .setDescription(`${member.user.username} has been temp-banned for 3 days by **BurritoBot**`)
                        //       .addField("Reason", "6th Warning")
                        //       .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
                        //   var tLog = new Discord.RichEmbed()
                        //       .setColor("ff3232")
                        //       .setAuthor(member.user.username, member.user.avatarURL)
                        //       .setTitle("User Temp-Banned")
                        //       .addField("Moderator", "BurritoBot", true)
                        //       .addField("User", `${member.user.tag}`, true)
                        //       .addField("User ID", `${member.user.id}`, true)
                        //       .addField("Duration", `6 days`)
                        //       .addField("Reason", `6th Warning (Automod)`)
                        //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTimestamp()
                        //   await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 6th Warning)\n\nDuration: 3 days`)
                        //   await message.channel.send(`${member.user}`, tban);
                        //   await member.ban(`6th Warning - Automod`)
                        //   let time = ("3d");
                        //   setTimeout(function () {
                        //   guild.unban(id)
                        // }, ms(time));
                        // let modlog = message.guild.channels.find("name", "burritobot-modlog");
                        // if (!modlog) return;
                        // bot.channels.get(modlog.id).send(tLog);
                        // };
                        // //7 warns, 7d ban
                        // if (warns[member.id].warns == 7) {
                        //   var tban = new Discord.RichEmbed()
                        //       .setColor("ff3232")
                        //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTitle("User Temp-Banned")
                        //       .setDescription(`${member.user.username} has been temp-banned for 7 days by **BurritoBot**`)
                        //       .addField("Reason", "7th Warning")
                        //       .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
                        //   var tLog = new Discord.RichEmbed()
                        //       .setColor("ff3232")
                        //       .setAuthor(member.user.username, member.user.avatarURL)
                        //       .setTitle("User Temp-Banned")
                        //       .addField("Moderator", "BurritoBot", true)
                        //       .addField("User", `${member.user.tag}`, true)
                        //       .addField("User ID", `${member.user.id}`, true)
                        //       .addField("Duration", `7 days`)
                        //       .addField("Reason", `7th Warning (Automod)`)
                        //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTimestamp()
                        //   await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 7th Warning)\n\nDuration: 7 days`)
                        //   await message.channel.send(`${member.user}`, tban);
                        //   await member.ban(`6th Warning - Automod`)
                        //   let time = ("7d");
                        //   setTimeout(function () {
                        //   guild.unban(id)
                        // }, ms(time));
                        // let modlog = message.guild.channels.find("name", "burritobot-modlog");
                        // if (!modlog) return;
                        // bot.channels.get(modlog.id).send(tLog);
                        // };
                        // //8 warns, hban
                        // if (warns[member.id].warns == 8) {
                        //   var tban = new Discord.RichEmbed()
                        //       .setColor("b70000")
                        //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTitle("User Hard-Banned")
                        //       .setDescription(`${member.user.username} has been hard-banned by **BurritoBot**\n\nAll of their messages sent in the previous 24 hours have been deleted and the user has been banned.`)
                        //       .addField("Reason", "8th Warning")
                        //       .setThumbnail("http://weclipart.com/gimg/64286F2FE1B49E0B/di8ojobyT.png")
                        //   var tLog = new Discord.RichEmbed()
                        //       .setColor("b70000")
                        //       .setAuthor(member.user.username, member.user.avatarURL)
                        //       .setTitle("User Hard-Banned")
                        //       .addField("Moderator", "BurritoBot", true)
                        //       .addField("User", `${member.user.tag}`, true)
                        //       .addField("User ID", `${member.user.id}`, true)
                        //       .addField("Reason", `8th Warning (Automod)`)
                        //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
                        //       .setTimestamp()
                        //   await member.send(`You have been hard-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 8th Warning)`)
                        //   await message.channel.send(`${member.user}`, tban);
                        //   await member.ban(1);
                        // let modlog = message.guild.channels.find("name", "burritobot-modlog");
                        // if (!modlog) return;
                        // bot.channels.get(modlog.id).send(tLog);
                        // };
                        // };
  //curse words automod
  // if (curseWords.some(word => message.content.toLowerCase().includes(word)) ) {
  //   if (message.author.id === "312358298667974656") return; //my ID
  //   if (message.author.id === "212081114095943690") return; //MrRay's ID
  //   if (message.author.id === "168604928133038080") return;
  //       message.delete();
  //   return message.reply("watch your language!! :rage:")
  //   .then(message => {
  //     message.delete(2500)
  //   });
  // };
//spam detector?
/*let talkedRecently = new Set();

// Checks if they have talked recently
/*if (talkedRecently.has(message.author.id)) {
  /*
   You can change the nature of the cool down by changing the return to something else.
   REMINDER: You may need to add an else statement if you do not have any returns in this scope.
  */
/*  return;
}
// Adds the user to the set so that they can't talk for 2.5 seconds
talkedRecently.add(message.author.id);
setTimeout(() => {
  message.reply("Stop spamming the command!")
  // Removes the user from the set after 2.5 seconds
  talkedRecently.delete(message.author.id);
}, 2500);*/

if (message.content.includes("@BurritoBot#9866 guilds")) return message.channel.send(`I\'m currently in **${bot.guilds.size}** guilds!`);


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
      const warnLog = message.guild.channels.find("name", "mod-logs")
      if (!warnLog) return;
      bot.channels.get(warnLog.id).send(warningLog)
  //     if (!warns[message.author.id]) warns[message.author.id] = {
  //       warns: 0
  //     };
  //       warns[message.author.id].warns++;
  //       fs.writeFile("./warnings.json", JSON.stringify(warns));
  // //3 warns, 1d mute
  //   if (warns[message.author.id].warns == 3) {
  //     var mute = new Discord.RichEmbed()
  //         .setColor("000305")
  //         .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //         .setTitle("User Muted")
  //         .setDescription(`${message.author.username} has been muted for 24 hours by **BurritoBot**`)
  //         .addField("Reason", `3rd Warning`)
  //         .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
  //     let logs = message.guild.channels.find("name", "mod-logs");
  //     if (!logs) return;
  //     var muteLog = new Discord.RichEmbed()
  //         .setColor("000305")
  //         .setAuthor(message.author.username, message.author.avatarURL)
  //         .setTitle("User Muted")
  //         .addField("Moderator", `BurritoBot`, true)
  //         .addField("User", `${message.author.tag}`, true)
  //         .addField("User ID", `${message.author.id}`,true)
  //         .addField("Duration", `24 hours`)
  //         .addField("Reason", `3rd Warning (Automod)`)
  //         .setFooter(`BurritoBot`, "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //         .setTimestamp()
  //   await message.channel.send(`${message.author}`, mute);
  //   let muteRole = message.guild.roles.find("name", "Muted")
  //   await member.addRole(muteRole.id);
  //   await bot.channels.get(logs.id).send(muteLog);
  //   let time = ("1d");
  //   setTimeout(function() {
  //     member.removeRole(muteRole.id)
  //     }, ms(time));
  //   };
  // //4 warns, 3d mute
  // if (warns[member.id].warns == 4) {
  //   var mute = new Discord.RichEmbed()
  //       .setColor("000305")
  //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTitle("User Muted")
  //       .setDescription(`${member.user.username} has been muted for 3 days by **BurritoBot**`)
  //       .addField("Reason", `4th Warning`)
  //       .setThumbnail("https://cdn.discordapp.com/emojis/368871483394752512.png")
  //   let logs = message.guild.channels.find("name", "burritobot-modlogs");
  //   if (!logs) return;
  //   var muteLog = new Discord.RichEmbed()
  //       .setColor("000305")
  //       .setAuthor(member.user.username, member.user.avatarURL)
  //       .setTitle("User Muted")
  //       .addField("Moderator", `BurritoBot`, true)
  //       .addField("User", `${member.user.tag}`, true)
  //       .addField("User ID", `${member.user.id}`,true)
  //       .addField("Duration", `3 days`)
  //       .addField("Reason", `4th Warning (Automod)`)
  //       .setFooter(`BurritoBot`, "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTimestamp()
  // await message.channel.send(`${member.user}`, mute);
  // let muteRole = message.guild.roles.find("name", "Muted")
  // await member.addRole(muteRole.id);
  // await bot.channels.get(logs.id).send(muteLog);
  // let time = ("3d");
  // setTimeout(function() {
  //   member.removeRole(muteRole.id)
  //   }, ms(time));
  // };
  // //5 warns, kick
  // if (warns[member.id].warns == 5) {
  //   var tban = new Discord.RichEmbed()
  //       .setColor("f27e02")
  //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTitle("User Kicked")
  //       .setDescription(`${member.user.username} has been kicked by **BurritoBot**`)
  //       .addField("Reason", "5th Warning")
  //       .setThumbnail("https://cdn.discordapp.com/emojis/365790858890444802.png?")
  //   var tLog = new Discord.RichEmbed()
  //       .setColor("f27e02")
  //       .setAuthor(member.user.username, member.user.avatarURL)
  //       .setTitle("User Kicked")
  //       .addField("Moderator", "BurritoBot", true)
  //       .addField("User", `${member.user.tag}`, true)
  //       .addField("User ID", `${member.user.id}`, true)
  //       .addField("Reason", `5th Warning (Automod)`)
  //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTimestamp()
  //   await member.send(`You have been kicked from ${message.guild.name} by **BurritoBot#9866**. (Reason: 5th Warning)\n\n:warning: \`You can join back with a valid invite link.\``);
  //   await message.channel.send(`${member.user}`, tban);
  //   await member.kick(`5th Warning - Automod`)
  // let modlog = message.guild.channels.find("name", "burritobot-modlog");
  // if (!modlog) return;
  // bot.channels.get(modlog.id).send(tLog);
  // };
  // //6 warns, 3d ban
  // if (warns[member.id].warns == 6) {
  //   var tban = new Discord.RichEmbed()
  //       .setColor("ff3232")
  //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTitle("User Temp-Banned")
  //       .setDescription(`${member.user.username} has been temp-banned for 3 days by **BurritoBot**`)
  //       .addField("Reason", "6th Warning")
  //       .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
  //   var tLog = new Discord.RichEmbed()
  //       .setColor("ff3232")
  //       .setAuthor(member.user.username, member.user.avatarURL)
  //       .setTitle("User Temp-Banned")
  //       .addField("Moderator", "BurritoBot", true)
  //       .addField("User", `${member.user.tag}`, true)
  //       .addField("User ID", `${member.user.id}`, true)
  //       .addField("Duration", `6 days`)
  //       .addField("Reason", `6th Warning (Automod)`)
  //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTimestamp()
  //   await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 6th Warning)\n\nDuration: 3 days`)
  //   await message.channel.send(`${member.user}`, tban);
  //   await member.ban(`6th Warning - Automod`)
  //   let time = ("3d");
  //   setTimeout(function () {
  //   guild.unban(id)
  // }, ms(time));
  // let modlog = message.guild.channels.find("name", "burritobot-modlog");
  // if (!modlog) return;
  // bot.channels.get(modlog.id).send(tLog);
  // };
  // //7 warns, 7d ban
  // if (warns[member.id].warns == 7) {
  //   var tban = new Discord.RichEmbed()
  //       .setColor("ff3232")
  //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTitle("User Temp-Banned")
  //       .setDescription(`${member.user.username} has been temp-banned for 7 days by **BurritoBot**`)
  //       .addField("Reason", "7th Warning")
  //       .setThumbnail("https://cdn.discordapp.com/emojis/368871667881213952.png")
  //   var tLog = new Discord.RichEmbed()
  //       .setColor("ff3232")
  //       .setAuthor(member.user.username, member.user.avatarURL)
  //       .setTitle("User Temp-Banned")
  //       .addField("Moderator", "BurritoBot", true)
  //       .addField("User", `${member.user.tag}`, true)
  //       .addField("User ID", `${member.user.id}`, true)
  //       .addField("Duration", `7 days`)
  //       .addField("Reason", `7th Warning (Automod)`)
  //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTimestamp()
  //   await member.send(`You have been temp-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 7th Warning)\n\nDuration: 7 days`)
  //   await message.channel.send(`${member.user}`, tban);
  //   await member.ban(`6th Warning - Automod`)
  //   let time = ("7d");
  //   setTimeout(function () {
  //   guild.unban(id)
  // }, ms(time));
  // let modlog = message.guild.channels.find("name", "burritobot-modlog");
  // if (!modlog) return;
  // bot.channels.get(modlog.id).send(tLog);
  // };
  // //8 warns, hban
  // if (warns[member.id].warns == 8) {
  //   var tban = new Discord.RichEmbed()
  //       .setColor("b70000")
  //       .setAuthor("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTitle("User Hard-Banned")
  //       .setDescription(`${member.user.username} has been hard-banned by **BurritoBot**\n\nAll of their messages sent in the previous 24 hours have been deleted and the user has been banned.`)
  //       .addField("Reason", "8th Warning")
  //       .setThumbnail("http://weclipart.com/gimg/64286F2FE1B49E0B/di8ojobyT.png")
  //   var tLog = new Discord.RichEmbed()
  //       .setColor("b70000")
  //       .setAuthor(member.user.username, member.user.avatarURL)
  //       .setTitle("User Hard-Banned")
  //       .addField("Moderator", "BurritoBot", true)
  //       .addField("User", `${member.user.tag}`, true)
  //       .addField("User ID", `${member.user.id}`, true)
  //       .addField("Reason", `8th Warning (Automod)`)
  //       .setFooter("BurritoBot", "https://images-ext-1.discordapp.net/external/lAeJHE-jp5GhT69Mf0zdmcGFyztMDsFGzDbq34k_6r4/https/cdn.discordapp.com/attachments/395472884878934016/405595927718526978/czb2.jpg")
  //       .setTimestamp()
  //   await member.send(`You have been hard-banned from ${message.guild.name} by **BurritoBot#9866**. (Reason: 8th Warning)`)
  //   await message.channel.send(`${member.user}`, tban);
  //   await member.ban(1);
  // let modlog = message.guild.channels.find("name", "burritobot-modlog");
  // if (!modlog) return;
  // bot.channels.get(modlog.id).send(tLog);
  };

  //if (!message.content.startsWith(prefix)) return;
  if (message.channel === "dm") return ("Are you really that lonely that you're trying to chat with a bot? :thinking:")

if (message.content.includes("<@394248379850424320> shut up!")) {
  return message.react("🖕")};

  /*    let banLevel = {
    		"mentions": 2,
    	};
const entry_mentions = message.mentions.users.size + message.mentions.roles.size;
if (entry_mentions > banLevel.mentions) {
  message.member.ban(1);
  message.channel.send(`:ok_hand: Banned **${message.member.tag}** for spamming!`)};*/

  // let command = message.content.split(" ")[0];
  // command = command.slice(prefix.length).toLowerCase();
  //
  // let args = message.content.split(" ").slice(1);
  // let commandfile = bot.commands.get(command.slice(prefix.length));
  // if(commandfile) commandfile.run(bot,message,args);
  //
if (!message.content.startsWith(prefix)) return;
