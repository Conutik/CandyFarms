const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");
const fs = require('fs');
const readline = require('readline');
const tty = require('tty');

module.exports = {
    config: {
        name: "setup",
        description: "Setup the bot!",
        usage: "!setup",
        category: "moderation",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
      
      let prefix = new MessageEmbed()
      .setTitle('Prefix')
      .setDescription('Please Send the Prefix! You need!')

const rl = readline.createInterface({
    input: fs.createReadStream(`${message.guild.id}-settings.txt`),
    output: process.stdout,
    terminal: false
});  
      
      message.channel.send(prefix)
      const filter = m => m.content;
      const collector = message.channel.createMessageCollector(filter, { max: 1 });

      collector.on('collect', m => {
        console.log(`Collected ${m.content}`);
        rl.on('line', (line) => {
          if(line.includes('Prefix:')) {
            let role = line
            readline.clearLine(line, 0)
          }
        })
        fs.appendFile(`${message.guild.id}-settings.txt`, `\nPrefix: ${m.content}`, (err) => {
        if (err) throw err;
        console.log('Join Role added');
      });
      });
    }

}