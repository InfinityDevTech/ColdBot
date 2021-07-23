const Discord = require("discord.js");

module.exports = {
    name: 'removesupport',
    usage: 'removesupport',
    description: "Removes support from a server and gives you another support token!",
    aliases: ['removepremiumserver', 'un-support'],
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
            let supporterID;
            let isSupported;
            db.collection('guilds').doc(message.guild.id).get().then((j) => {
                if (j.exists) {
                    supporterID = j.data().supporterID;
                    isSupported = j.data().isSupported;
                }
    
            }).then(async () => {

            try {

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
                if (!isSupported) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle("Error!")
                        .addFields(
                            { name: '\u200b', value: `Error! This server is not supported, you cannot retract support to this server if it is already supported!` },

                        )
                    message.author.send(embed)
                    return
                }
                if (!supporterID === message.author.id) {
                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle("Error!")
                        .addFields(
                            { name: '\u200b', value: `Error! You are not the supporter! So you cant retract support if your not supporting the server!` },

                        )
                    message.author.send(embed)
                    return
                }
               
                let newservercount = serversCanSupport++
                db.collection('patrons').doc(message.author.id).update({
                    'serversCanSupport' : newservercount
                })
                db.collection('guilds').doc(message.guild.id).update({
                    'isSupported' : 'false',
                    'patronSupporterID' : 'undefined'
                }).then(async () => {
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("Support Added!")
                    .addFields(
                        { name: '\u200b', value: `The server ${message.guilld.name} now does not have any support! Commands coming soon :)` },

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
