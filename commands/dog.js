const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
    name: 'dog',
    usage: 'dog',
    description: "Shows an adorable puppy 🐶",
    aliases: ['puppy', 'doggy'],
    cooldown: 5,
    execute(client, message, args, Discord, db){

        axios
        .get('https://api.thedogapi.com/v1/images/search')
        .then((res) => {
        

      
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("puppy  🐶")
              .setImage(res.data[0].url)
            message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })
              message.delete();
              
              })
              }
    }