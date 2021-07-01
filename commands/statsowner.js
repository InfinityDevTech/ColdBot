let os = require('os-utils');
const Discord = require("discord.js");

module.exports = {
    name: 'statsowner',
    description: "Shows owner only bot stats",
    execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        if (message.author.id === "574445866220388352") {

            const promises = [
                client.shard.fetchClientValues('guilds.cache.size'),
                client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
            ];
    
            return Promise.all(promises)
                .then(results => {

                    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

                let freememGB = os.freemem() / 1000
let totalmemGB = os.totalmem() / 1000
let freememMB = os.freemem()
let totalmemMB = os.totalmem()

            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle("Stats: ")
            .addFields(
              { name: '\u200b', value: `Here are some of the bot stats`},
              { name: '\u200b', value: `Server Count: \`${totalGuilds}\``},
              { name: '\u200b', value: `User Count: \`${totalMembers}\``},
              { name: '\u200b', value: `The bots used RAM is: ${Math.ceil(totalmemGB - freememGB)}GB` },
              { name: '\u200b', value: `The bots used RAM is: ${Math.ceil(totalmemMB - freememMB)}MB` },
              
            )
          message.author.send(embed)
          .then(msg => {
              setTimeout(() => msg.delete(), 60000)
            })
            message.delete();  
            })
        }
    }
}