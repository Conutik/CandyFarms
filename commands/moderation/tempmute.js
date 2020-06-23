const { MessageEmbed } = require("discord.js")
const ms = require("ms");
 
module.exports = {
    config: {
        name: "tempmute",
        description: "tempmutes a user from the server",
        usage: "#tempmute",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["tm"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
 
if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")
     
//define the reason and mutee
let time = args[1];
let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mutee) {
        return message.channel.send("Please mention the user that you want to mute")
      }
      if (mutee.id === message.author.id) {
            return message.reply("You can't mute yourself...")
                .then(m => m.delete(10000));
        }
      
  
 
let reason = args.slice(2).join(" ");
if(!reason) reason = "No reason given"
 
//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.cache.find(r => r.name === "muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}
 
//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
   
})
setTimeout(function(){
  mutee.removeRole(muterole.id)
  mutee.send(`You have been unmuted from \`${message.guild.name}\``)



}, ms(time))
//send an embed to the modlogs channel
 

message.channel.send(`${mutee.user.tag} has been muted for ${ms(ms(time))}`)
      
      let wembed = new MessageEmbed()
      .setColor("#f94343")
      .setAuthor(`${message.guild.name} TempMute`, message.guild.iconURL)
      .addField(`You have been TempMuted by ${message.author.tag}`, `Reason: ${reason}`)
      mutee.send(wembed)
      
            const fs = require('fs');
      
      fs.appendFile(`${message.guild.id}-punish.txt`, `\n${mutee} - Type: TempMute - Reason: ${reason}`, 'utf8', (err) => {
        if (err) throw err;
      });
    }
}