const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "level",
        aliases: ["rank"],
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays your level",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      let score = bot.getScore.get(message.author.id, message.guild.id);
        let embed = new MessageEmbed() 
        .setColor("#ace9e7")
        .setTitle(`**Your Level!**`)
        .setDescription(`You are level **${score.level}** and have **${score.points}** points`)
        message.channel.send(embed);
    }
}