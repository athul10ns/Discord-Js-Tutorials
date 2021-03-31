 const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js')
const bot = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;


let PREFIX = "!"

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./src/${file}`);
  bot.commands.set(command.name, command);
}


bot.on('ready', () => {
console.log("Online")

});

bot.on('message', async message => {
if (!message.content.startsWith(PREFIX)) return;

let args = message.content.slice(PREFIX.length).split(" ");
let command = args.shift().toLowerCase()


if (command === "ping"){ 
  bot.commands.get('ping').execute(message, args)
}


if (command === "help") {
  bot.commands.get("help").execute(bot, message, args, Discord, commandFiles)
}

});
bot.login(token);
