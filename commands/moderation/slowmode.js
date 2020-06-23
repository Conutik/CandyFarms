const Discord = module.require('discord.js');
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "slowmode",
        description: "Slow chat!",
        usage: "!slowmode",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["sm"]
    },
    run: async (bot, message, args) => {
      if(!message.member.hasPermission("MANAGE_CHANNELS") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
      if(!args[0]) return message.channel.send("Spefify the length of slowmode in seconds! (1-21600 Seconds)")
      let duration = args[0]
      message.channel.setRateLimitPerUser(duration)
        .catch(() => {
        message.channel.send("Failed to set slowmode in this channel, check your slowmode length.")
      })
      message.channel.send("I have set the slowmode in this channel to " + duration + " seconds!")
    }
}