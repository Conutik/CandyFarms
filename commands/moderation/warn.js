const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const fs = require('fs');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./warns.sqlite');

module.exports = {
    config: {
        name: "warn",
        description: "warms a member in the discord!",
        usage: "!warn <user> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["w"] 
    },
    run: async (bot, message, args) => {



//define the reason and warnee
let warnee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!warnee) return message.channel.send("Please supply a user to be warned!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

//add role to the mentioned user and also send the user a dm explaing where and why they were muted
message.delete()
let wembed = new MessageEmbed()
    .setColor("#f94343")
    .setAuthor(`${message.guild.name} Warn`, message.guild.iconURL)
    .addField(`You have been warned by ${message.author.tag}`, `Reason: ${reason}`)
warnee.send(wembed)
message.channel.send(`${warnee.user.username} was successfully warned.`)

//send an embed to the modlogs channel
let embed = new MessageEmbed()
    .setColor("#f94343")
    .setAuthor(`${message.guild.name} modlogs`, message.guild.iconURL)
    .addField("Moderation:", "warn")
    .addField("warnee:", warnee.user.tag)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

if(!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
      
      fs.appendFile(`${message.guild.id}-warn.txt`, `\n${warnee} - Reason: ${reason}`, 'utf8', (err) => {
        if (err) throw err;
        console.log(`${warnee} has been warned!`);
      });
      fs.appendFile(`${message.guild.id}-punish.txt`, `\n${warnee} - Type: Warn - Reason: ${reason}`, 'utf8', (err) => {
        if (err) throw err;
      });
        let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
        sChannel.send(embed)
    }
}