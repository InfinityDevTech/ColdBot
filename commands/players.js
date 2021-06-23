const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("185.249.196.248:30424");
const Discord = require("discord.js");

module.exports = {
    name: 'players',
    description: "Checks Players Online!",
    execute(client, message, args, Discord, db){

        if (!message.guild) return;

        message.delete();
        server.getPlayers().then((data) => {
            let result  = [];
            let index = 1;
            for (let player of data) {
              result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
            }
            const embed = new Discord.MessageEmbed()
              .setColor("BLUE")
              .setAuthor("Server is online")
              .setTitle(`Players Online`)
              .setDescription(result.length > 0 ? result : 'No Players Online!')
              .setFooter(message.author.tag)
            message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 10000)
              })
          }).catch((err) => {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("Server is offline")
            .setFooter(message.author.tag);
          message.channel.send(embed)
          .then(msg => {
            setTimeout(() => msg.delete(), 10000)
          })
          });
    }
}