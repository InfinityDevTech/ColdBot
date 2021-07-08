const Discord = require("discord.js");

module.exports = {
    name: 'supportserver',
    description: "Lets a patron support a server",
    async execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        let rank;
        let serversCanSupport;
        db.collection('patrons').doc(message.author.id).get().then((q) => {
            if (q.exists) {
                rank = q.data().rank;
                serversCanSupport = q.data().serversCanSupport;
            }

        }).then(async () => {

            try {
                let guildtosupport = message.guild.id

                if (!rank) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle("Error!")
                        .addFields(
                            { name: '\u200b', value: `You are not a patron! You can become one here though: \`https://www.patreon.com/InfinityDevTech\`!` },

                        )
                    message.author.send(embed)
                    return
                }
                if (serversCanSupport === '0') {
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("Error!")
                    .addFields(
                        { name: '\u200b', value: `You do not have enough support tokens left! You must un-support a server or get a higher tier! You can get a better tier here \`https://www.patreon.com/InfinityDevTech\`` },

                    )
                message.author.send(embed)
                return
                }
                let newservercount = serversCanSupport--
                db.collection('guilds').doc(message.guild.id).set({
                    'serversCanSupport' : newservercount,
                    'isSupported' : 'true'
                })
                


            } catch (err) {
                message.author.send(`\`${err}\``)
            }
        })
    }

}
