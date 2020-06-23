const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");
const fs = require('fs');

module.exports = {
    config: {
        name: "joinrole",
        description: "Support tickets",
        usage: "!closeticket",
        category: "moderation",
        accessableby: "Everyone"
    },
    run: async (bot, message, args) => {
      
      if(message.author.id !== message.guild.owner.user.id) {
        message.channel.send('No Perms!')
      } else {
        
      let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
      if(!role) return message.channel.send("Please provide a role to add to give to people who join.") 
      
        if (fs.existsSync(`${message.guild.id}.txt`)) {
          try {
            fs.unlinkSync(`${message.guild.id}.txt`)
            fs.appendFile(`${message.guild.id}.txt`, role, 'utf8', (err) => {
              if (err) throw err;
              console.log('Join Role updated to new role');
              message.channel.send('Join Role updated to new role')
            });
          } catch(err) {
            console.error(err)
          }
  } else {
      fs.appendFile(`${message.guild.id}.txt`, role, (err) => {
        if (err) throw err;
        console.log('Join Role added');
        message.channel.send('Join Role added')
      });
  }
    }
    }
}