const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fs = require('fs');

module.exports = async (bot, member) => {
  let embed = new MessageEmbed() 
  .setColor('green_light')
  .setTitle("**Member Joined**")
  .setDescription(`Welcome, <@${member.user.id}>To ***${member.guild.name}!***`, `\u200B`)
  .setFooter(`There are now ${member.guild.members.size} members on the server.`);
  member.guild.channels.find(c => c.name === "join").send(embed);
  let role = fs.readFileSync(`${member.guild.id}.txt`);
  if (!role) role = console.log(`No Join role added in guild ${member.guild.name}`)
  role = role.replace('<@&', '');
  role = role.replace('>', '');
  
  member.addRole(role)
};