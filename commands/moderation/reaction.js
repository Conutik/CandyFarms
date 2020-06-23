const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");
const fs = require('fs');

module.exports = {
    config: {
        name: "reactionrole",
        description: "Support tickets",
        usage: "!closeticket",
        category: "moderation",
        accessableby: "Everyone"
    },
    run: async (bot, message, args) => {
      
      if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
      
      let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
      if(!role) return message.channel.send("Please provide a role to add to reaction roles!")
      
      let reason = args[1];
      if(!reason) reason = "No reaction given!"
      
      let name = args.slice(2).join(" ");
      if(!name) reason = "Specify what to write after the role!"
      
      message.channel.send(`${reason} ${role} ${name}`).then(function (message) {
              message.react(reason)
      const filter = (reaction, user) => {
        return reaction.emoji.name === `${reason}`;
      };

      const collector = message.createReactionCollector(filter, { dispose: true });

      collector.on('collect', reaction => {
        console.log(`Collected ${reaction.emoji.name} from ${reaction.users.cache.last().tag}`);
        
        let rUser = reaction.message.guild.members.cache.get(`${reaction.users.cache.last().id}`)
        rUser.roles.add(role.id)
      });
        collector.on('remove', (reaction, user) => {
        console.log(`Removed ${reaction.emoji.name} from ${reaction.users.cache.last().tag}`);
        
        let rUser = reaction.message.guild.members.cache.get(`${reaction.users.cache.last().id}`)
         reaction.message.guild.member(user).roles.remove(role.id)
      });
      })
    }
}