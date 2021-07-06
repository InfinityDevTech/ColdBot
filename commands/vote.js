const Discord = require("discord.js");

module.exports = {
    name: 'vote',
    usage: 'vote',
    description: "Shows my vote page to support me!",
    aliases: ['votebot', 'vpage'],
    cooldown: 10,
    execute(client, message, args, Discord, db){
        if (!message.guild) return;
        
    message.author.send("Thank you for voting! Vote link: https://top.gg/bot/855035553916518401/vote")   
    .then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      message.delete(); 
    
    }
}