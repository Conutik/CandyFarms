const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");

module.exports = {
    config: {
        name: "closeticket",
        description: "Support tickets",
        usage: "!closeticket",
        category: "moderation",
        accessableby: "Everyone"
    },
    run: async (bot, message, args) => {

      let name = `ticket-${message.author.username}`.toLowerCase(); 
      let ticket = name.replace(" ", "-")
      let channel = message.channel.name
      if (ticket === channel) {
        let embed = new MessageEmbed()
        .setColor(aqua)
        .setTitle(`**Ticket**`)
        .setDescription(`Ticket Has been closed`)
        message.author.send(embed)
        message.channel.updateOverwrite(message.author.id, { VIEW_CHANNEL: false });
        let membed = new MessageEmbed()
        .setColor(aqua)
        .setTitle(`**Ticket**`)
        .addField(`Ticket Has been closed and is now Archived`, `Support was given to ${message.author.username}`)
        message.channel.send(membed)
        message.channel.setName(`${message.channel.name}-archived`)
        message.channel.setParent(`714108832191873084`)
        console.log(`${message.author.username} has closed his ticket. Ticket is now archived. (Ticket ID: ${message.channel.id})`)
      } else {
        message.reply(`You may only close your ticket!`)
      }
    }
}