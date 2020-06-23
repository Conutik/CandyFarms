const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "!ban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["b", "banish", "remove"]
    },
    run: async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

      let wembed = new MessageEmbed()
      .setColor("#f94343")
      .setAuthor(`${message.guild.name} Ban`, message.guild.iconURL)
      .addField(`You have been Banned from ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
      banMember.send(wembed).then(() =>
   banMember.ban({reason: reason})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`) 

    let embed = new MessageEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "ban")
    .addField("Banned member:", banMember.user.tag)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
        sChannel.send(embed)
    }
}