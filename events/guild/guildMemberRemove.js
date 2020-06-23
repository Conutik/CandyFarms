const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = async (bot, member) => {
  let embed = new MessageEmbed()
  .setColor('green_light')
  .setTitle("**Member Left**")
  .setDescription(`Bye ${member.user}! Hope you enjoyed **${member.guild.name}!**`)
  let channel = member.guild.channels.cache.find(c => c.name === "leave");
  channel.send(embed);
};