const Discord = require("discord.js");

module.exports = {
    name: 'help',
    usage: 'help',
    description: "Shows the help page to get information on my commands!",
    aliases: ['helpme', 'h'],
    cooldown: 60,
    execute(client, message, args, Discord, db){

      if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Commands: ")
              .setAuthor("Help!")
              .addFields(
                { name: '📰 - General Commands', value: "`<NO PREFIX> - coldbotprefix`, `vote - shows the vote page`, `paypal - shows my paypal to support me!`"},
                { name: '👔 - Administrative Help', value: "This command shows admins the help page: `adminhelp`"},
                { name: '🤣 - Fun Commands', value: "`cat - shows a picture of a cute kitty`, `dog - shows a picture of a adorable dog`, `randomnumber <MINIMUM> <MAXIMUM> - makes a random number between your specifications`, `rolldice <NUMBER-OF-DICE> - rolls the number of dice you specify`"},
                { name: '\u200b', value: '[Support Me!](https://www.paypal.com/paypalme/infinitydevtech) | [Vote for the bot!](https://top.gg/bot/855035553916518401/vote) | [Bot discord!](https://discord.gg/k4fb9TZfcK) | [Add the bot to servers!](https://discord.com/oauth2/authorize?client_id=855035553916518401&scope=bot&permissions=8)'},
                
              )
            message.author.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
              })
              message.delete();
              } else {
                let commandfile = require(`./${args[0]}`)

                if (!commandfile) {
                  return;
                }
                let usage = commandfile.usage

                if (usage) {


                let name = commandfile.name
                let description = commandfile.description
                let aliases = commandfile.aliases.toString()
                if (!aliases) aliases = "No other aliases present"
                let cooldown = commandfile.cooldown
                if (!cooldown) cooldown = 3;

                if (!description) description = "No description present, you may have found a secret command ;)"

                const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Commands: ")
              .setAuthor("Help!")
              .addFields(
                { name: '\u200b', value: `**Command name:** ${name}`},
                { name: '\u200b', value: `**Command usage:** ${usage}`},
                { name: '\u200b', value: `**Command aliases:** ${aliases}`},
                { name: '\u200b', value: `**Command description:** ${description}`},
                { name: '\u200b', value: `**Command cooldown:** ${cooldown} second(s)`},
                
              )
            message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
              })
              message.delete();
                } else {
                  return;
                }
              }
              }
    }