const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fs = require('fs');

module.exports = async (bot, guild) => { 

let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
  
  let embed = new MessageEmbed()
  .setColor(cyan)
  .setTitle('Thanks For Inviting Me!')
  .addField('To check my commands do .help!', 'And To Change my prefix use .prefix')
  .setDescription('If you want to do a Full Setup Please use .setup')
defaultChannel.send('Hello, Im a Bot!')


}