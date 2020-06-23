const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");

module.exports = {
    config: {
        name: "support",
        description: "Support tickets",
        usage: "!support",
        category: "moderation",
        accessableby: "Everyone"
    },
    run: async (bot, message, args) => {
      

    let banuser = args[0]
    if(!banuser) return message.channel.send("Please provide Your Issue")

    message.channel.send(`Your Ticket has been made <@${message.author.id}>`);
      
      let embed = new MessageEmbed()
      .setColor(aqua)
      .setTitle(`**Ticket**`)
      .addField("Issue:", banuser)
      .addField(`Please wait @${message.author.id} until our Staff Team review your ticket!`, `Please Do not Spam @ staff!`)
      
      let role = message.guild.roles.cache.find(r => r.id == `714108521289089074`)
      
      message.guild.channels.create(`ticket-${message.author.username}`, {
        type: 'text',
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: message.author.id,
            allow: ['SEND_MESSAGES']
          },
          {
            id: message.author.id,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: message.author.id,
            allow: ['SEND_MESSAGES']
          },
          {
            id: role,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: role,
            allow: ['SEND_MESSAGES']
          },
        ],
      }).then(createdChannel => {
        createdChannel.send(embed)
        createdChannel.setParent(`713791837516726333`)
        createdChannel.updateOverwrite(role, { VIEW_CHANNEL: true });
        createdChannel.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });
        console.log(`${message.author.username} has opened a ticket. (Ticket ID: ${createdChannel.id})`)
      });
    }
}