const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: "Shows Help",
    execute(client, message, args, Discord, db){

            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Commands: ")
              .setAuthor("Help!")
              .addFields(
                { name: '📰 - General Commands', value: "`<NO PREFIX> - coldbotprefix`, `vote - shows the vote page`, `paypal - shows my paypal to support me!`"},
                { name: '👔 - Administrative Help', value: "This command shows admins the help page: `adminhelp`"},
                { name: '\u200b', value: '[Support Me!](https://www.paypal.com/paypalme/infinitydevtech) | [Vote for the bot!](https://top.gg/bot/855035553916518401/vote) | [Bot discord!](https://discord.gg/k4fb9TZfcK) | [Add the bot to servers!](https://discord.com/oauth2/authorize?client_id=855035553916518401&scope=bot&permissions=8)'},
                
              )
            message.author.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
              })
              message.delete();
              }
    }
