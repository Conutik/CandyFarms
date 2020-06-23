const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "kick",
        description: "Kick a user from the guild!",
        usage: "!kick",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["k"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!kickMember) return message.channel.send("Please provide a user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

          let wembed = new MessageEmbed()
      .setColor("#f94343")
      .setAuthor(`${message.guild.name} Kick`, message.guild.iconURL)
      .addField(`You have been Kicked from ${message.guild.name} by ${message.author.tag}`, `Reason: ${reason}`)
      kickMember.send(wembed).then(() => 
    kickMember.kick()).catch(err => console.log(err))

    message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))

    let embed = new MessageEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "kick")
    .addField("kicked member:", kickMember.user.tag)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
        sChannel.send(embed)

    }
}