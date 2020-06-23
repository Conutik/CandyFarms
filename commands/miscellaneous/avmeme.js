const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "avmeme",
        description: "Sends a meme from a website!",
        usage: "",
        category: "images",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generating...")
        
        loadCuties(message)

      function loadCuties() {
        fetch('https://www.reddit.com/r/aviationmemes.json?limit=300&?sort=top&t=all')
          .then(res => res.json())
          .then(json => json.data.children.map(v => v.data.url))
          .then(urls => postRandomCutie(urls));
      }

      function postRandomCutie(urls) {
        const randomURL = urls[Math.floor(Math.random() * urls.length) + 1];
        const embed = new MessageEmbed({
          image: {
            url: randomURL
          }
        });
            let sembed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} meme!`, message.guild.iconURL)
            .setImage(randomURL)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(sembed)
        }
    }
}