const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { cyan } = require("../../colours.json")
const fs = require('fs');
const readline = require('readline');

module.exports = {
    config: {
        name: "warns",
        aliases: ["rank"],
        usage: "(command)",
        category: "moderation",
        description: "Displays your level",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      if(!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
      
      let warnee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!warnee) return message.channel.send("Please supply a user to check his warns");
      
        let embed = new MessageEmbed() 
        .setColor("#ace9e7")
        .setTitle(`**${warnee.user.username}'s Warns**`)
        
        let r = await message.channel.send(embed)




const rl = readline.createInterface({
    input: fs.createReadStream(`${message.guild.id}-warn.txt`),
    output: process.stdout,
    terminal: false
});
      
      let num = 1

rl.on('line', (line) => {
  if(line.includes(warnee)) {
    let role = line
    if(line.includes('!')) {
      role = role.replace(`<@!${warnee.id}>`, '')
      console.log(`${num}${role}`);
      r.edit(embed.addField("\u200B", `${num}${role}`))
    
    num++;
  } else {
    let role = line
    role = role.replace(`<@${warnee.id}>`, '')
    console.log(`${num}${role}`);
    r.edit(embed.addField("\u200B", `${num}${role}`))
    
    num++;
  }
  }
});
    }
}