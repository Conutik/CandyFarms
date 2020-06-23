const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "guild",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      let guild = args[0]
      if(!guild) return message.channel.send('Please supply the guild ID!');
      
      let name = bot.guilds.cache.get(guild).name
      
        const embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`Guild Finder`, message.guild.iconURL)
            .setDescription(name)
            .setThumbnail(bot.user.displayAvatarURL)
        
        message.channel.send(embed)
        }
}