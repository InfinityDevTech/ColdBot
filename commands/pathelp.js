const Discord = require("discord.js");

module.exports = {
    name: 'pathelp',
    usage: 'pathelp',
    description: "Shows the help page, but for patrons...",
    aliases: ['patronhelp', 'phelp'],
    cooldown: 60,
    execute(client, message, args, Discord, db){

        let rank

        db.collection('patrons').doc(message.member.id).get().then((q) => {
            if (q.exists) {
                rank = q.data().rank;
            }
            
        }).then(() => {

           if (rank === '1') {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Patron commands: ")
              .addFields(
                { name: '\u200b', value: `Patreon is coming soon, so if you found this early, you were most likely added to it by the owner!`},
                
              )
            message.author.send(embed)
           } else if (rank === '2') {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Patron commands: ")
              .addFields(
                { name: '\u200b', value: `Patreon is coming soon, so if you found this early, you were most likely added to it by the owner!`},
                
              )
              message.author.send(embed)
           } else if (rank === '3') {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Patron commands: ")
              .addFields(
                { name: '\u200b', value: `Patreon is coming soon, so if you found this early, you were most likely added to it by the owner!`},
                
              )
              message.author.send(embed)
           }
          message.delete()
        })
    }
}