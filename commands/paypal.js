const Discord = require("discord.js");

module.exports = {
    name: 'paypal',
    usage: 'paypal',
    description: "Shows my paypal to support me!",
    aliases: ['supportbot', 'ppal'],
    cooldown: 10,
    execute(client, message, args, Discord, db){
        if (!message.guild) return;
        
    message.author.send("Thank you for supporting me! Payment link: https://paypal.me/infinitydevtech")   
    .then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      message.delete(); 
    
    }
}