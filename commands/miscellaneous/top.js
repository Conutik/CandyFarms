const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { cyan } = require("../../colours.json")
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

module.exports = {
    config: {
        name: "ranks",
        aliases: ["top", "leaderboard", "levels"],
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays most players who send messages",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
      const embed = new MessageEmbed()
      .setTitle("Leaderboard")
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setDescription("Our top 10 points leaders!")
      .setColor("#ace9e7");
      
      for(const data of top10) {
        embed.addField(bot.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
      }
      return message.channel.send({embed});
    }
}