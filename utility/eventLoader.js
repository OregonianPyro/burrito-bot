const bot = new Discord.Client()
const reqEvent = (event) => require(`../events/${event}`)
module.exports = bot => {
    bot.on('ready', () => {
      console.log(`${client.user.username} Ready!`);
    });
  }
  bot.on('message', reqEvent('message'));
};