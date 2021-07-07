const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
    name: 'cat',
    usage: 'cat',
    description: "Shows a precious kitty 🐱",
    aliases: ['kitkat', 'kitty'],
    cooldown: 5,
    execute(client, message, args, Discord, db){

        axios
        .get('https://api.thecatapi.com/v1/images/search')
        .then((res) => {
        

      
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Kitty 🐱")
              .setImage(res.data[0].url)
            message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })
              message.delete();
              
              })
              }
    }