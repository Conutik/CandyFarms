const fs = require('fs');
const { prefix } = require("../../botconfig.json");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const readline = require('readline');

module.exports = async (bot, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;
 let score;
  if (message.guild) {
    score = bot.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
    }
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if(score.level < curLevel) {
      score.level++;
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
    }
    bot.setScore.run(score);
  }
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
  
  if (fs.existsSync(`${message.guild.id}-settings.txt`)) {
    const rl = readline.createInterface({
    input: fs.createReadStream(`${message.guild.id}-settings.txt`),
    output: process.stdout,
    terminal: false
});
  
    rl.on('line', (line) => {
      if(line.includes('Prefix:')) {
        let role = line;
        role = role.replace('Prefix: ', '');
        if(!message.content.startsWith(role)) return;
        let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
        if(commandfile) commandfile.run(bot, message, args)
      } 
    })
  }
}