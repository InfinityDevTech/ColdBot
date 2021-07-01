const Discord = require("discord.js");
const randomstring = require("randomstring");
let dayjs = require('dayjs');

module.exports = {
    name: 'automod',
    description: "automod config",
    execute(client, message, args, Discord, db) {
        if (message.member.hasPermission('ADMINISTRATOR')) {

            let oldvalue;
            let tolerance;

            db.collection('guilds').doc(message.guild.id).get().then((h) => {
                if (h.exists) {
                    oldvalue = h.data().spamFilter;
                    tolerance = h.data().spamTolerance
                }
            }).then(async () => {

                if (args[0] === "toggle") {
                    let toggle;

                    if (oldvalue === "true") {
                        let toggle = 'false'
                        db.collection('guilds').doc(message.guild.id).update({
                            'spamFilter': 'false'
                        })
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle("Automod toggled!")
                            .addFields(
                                { name: '\u200b', value: `Automod toggled to ${toggle}` },

                            )
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        return
                    } else if (oldvalue === "false") {
                        let toggle = 'true'
                        db.collection('guilds').doc(message.guild.id).update({
                            'spamFilter': 'true'
                        })
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle("Automod toggled!")
                            .addFields(
                                { name: '\u200b', value: `Automod toggled to ${toggle}` },

                            )
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        return
                    }


                    message.delete();
                } else if (args[0] === "strict") {
                    let newvalue = args[1];
                    if (newvalue < 25) {
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle(`You cannot set the automod to lower than 25!`)
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        return
                    }
                    if (newvalue > 100) {
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle(`The automod strictness cannot be set above 100!`)
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        return
                    }
                    if (isNaN(newvalue)) {
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle(`That is not a number! Please set a number between 1 and 100! The lower the number the more messages deleted, the higher the less messages deleted!`)
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        return
                    }

                    db.collection('guilds').doc(message.guild.id).update({
                        'spamTolerance': `${newvalue}`
                    })
                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle(`The strictness is now set to **${newvalue}**!`)
                    message.author.send(embed)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 60000)
                        })
                    message.delete();
                    return
                } else if (args[0] === "stats") {
                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle("Automod stats")
                        .addFields(
                            { name: '\u200b', value: `Filter enabled: ${oldvalue}` },
                            { name: '\u200b', value: `Filter tolerance: ${tolerance}` },

                        )
                    message.author.send(embed)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 60000)
                        })
                    message.delete();

                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle("Commands: ")
                        .addFields(
                            { name: '🤖 - automod commands', value: "`automod strict <NUMBER> - Changes the strictness of the automoderator`, `automod toggle - toggles the automod on and off`" },

                        )
                    message.author.send(embed)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 60000)
                        })
                    message.delete();
                    return
                }

            })
        }

    }
}
