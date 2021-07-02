const Discord = require("discord.js");

module.exports = {
    name: 'ownerhelp',
    description: "Shows Help",
    execute(client, message, args, Discord, db){
      if (message.author.id === "574445866220388352") {


            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Commands: ")
              .addFields(
                { name: '\u200b', value: '`patadd <patron> <rank> - patremove <patron> <rank>`, `statsowner`, `blacklist <user> - unblacklist <user>`, `ownerhelp`'},
                
              )
            message.author.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
              })
              message.delete();
              }
    }
}