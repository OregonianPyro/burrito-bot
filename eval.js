if (command === "eval") {
if (message.author.id !== settings.devID) return;
const guild = message.guild;
const content = message.content.split(' ').slice(1).join(' ');
const result = new Promise((resolve, reject) => resolve(eval(content)));

return result.then(output => {
 if (typeof output !== 'string') output = require('util').inspect(output, {
 depth: 0
 });
 if (output.includes(bot.token)) output = output.replace(bot.token, 'Not for your eyes');
 //length
 var toolong = new Discord.RichEmbed()
     .setColor("e7ea3c")
     .setTitle("Eval Success")
     .setDescription(`:warning: **Length too long, check console.**`)
 if (output.length > 1990) console.log(output), message.channel.send(toolong);
//succes embed
var success = new Discord.RichEmbed()
    .setColor("65ea1e")
    .setTitle("Eval Success")
    .setDescription(`\`\`\`js\noutput, ${code: 'js'}\n\`\`\``)
 return message.channel.send(success;
}).catch(err => {
 console.error(err);
 err = err.toString();

 if (err.includes(bot.token)) err = err.replace(bot.token, 'Not for your eyes');
//error embed
var errored = new Discord.RichEmbed()
    .setColor("ff0000")
    .setTitle("Eval Error")
    .setDescription(`\`\`\`js\nerr, ${code: 'js'}\n\`\`\``)
 return message.channel.send(errored);
});
};
