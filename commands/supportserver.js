const Discord = require("discord.js");

module.exports = {
    name: 'supportserver',
    usage: 'supportserver',
    description: "Allows you to support a server using your patreon powers!",
    aliases: ['serverpremium', 'serversupport', 'premiumserver'],
    cooldown: 5,
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
            let supportstatus;
            db.collection('guilds').doc(message.guild.id).get().then((yourmom) => {
                if (yourmom.exists) {
                    supportstatus = yourmom.data().isSupported;
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
                if (supportstatus === 'true') {
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("Error!")
                    .addFields(
                        { name: '\u200b', value: `This server is already supported! You cannot support a server that is already supported!` },

                    )
                message.author.send(embed)
                return
                }
                let newservercount = serversCanSupport--
                db.collection('patrons').doc(message.author.id).update({
                    'serversCanSupport' : newservercount
                })
                db.collection('guilds').doc(message.guild.id).update({
                    'isSupported' : 'true',
                    'patronSupporterID' : message.author.id
                }).then(async () => {
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("Support Added!")
                    .addFields(
                        { name: '\u200b', value: `The server ${message.guild.name} now has patron support! Commands coming soon :)` },

                    )
                message.author.send(embed)
                message.guild.owner.send(embed)
                })
                


            } catch (err) {
                message.author.send(`\`${err}\``)
            }
        })
        })
    }

}
