const Discord = require("discord.js");
const randomstring = require("randomstring");
let dayjs = require('dayjs');

module.exports = {
    name: 'dbk',
    description: "Checks kick logs",
    execute(client, message, args, Discord, db) {

if (!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setColor("WHITE")
              .setDescription("No arguements specified!")
            message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 5000)
              })
            return;
}

        if (message.member.hasPermission('ADMINISTRATOR')) {

            let id = args[0];

            let kickGuildID;
            let kickID;
            let kickReason;
            let adminWhokicked;
            let kickedUser;
            let kickedUserID;
            let kickDate;
            let kickTime

            db.collection('kicks').doc(id).get().then((q) => {
                if (q.exists) {
                    kickGuildID = q.data().kickGuildID;
                    kickID = q.data().KickID;
                    kickReason = q.data().KickReason;
                    adminWhokicked = q.data().adminWhoKicked;
                    kickedUser = q.data().KickedUser;
                    kickedUserID = q.data().KickedUserID;
                    kickDate = q.data().KickDate;
                    kickTime = q.data().KickTime;
                }

console.log(kickGuildID)
console.log(message.guild.id)

            }).then(() => {
                if (kickGuildID === message.guild.id) {
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                        .setTitle(`Kick Info: `)
                        .addFields(
                            { name: '\u200b', value: `KickID: ${kickID}` },
                            { name: '\u200b', value: `Kick Reason: ${kickReason}` },
                            { name: '\u200b', value: `Administrator who kicked the user: ${adminWhokicked}` },
                            { name: '\u200b', value: `Kicked User: ${kickedUser}` },
                            { name: '\u200b', value: `Kicked User ID: ${kickedUserID}` },
                            { name: '\u200b', value: `Kick Date: ${kickDate}` },
                            { name: '\u200b', value: `Kick Time: ${kickTime}` },
                            { name: '\u200b', value: '[Support Me!](https://www.paypal.com/paypalme/infinitydevtech) | [Vote for the bot!](https://top.gg/bot/855035553916518401/vote) | [Bot discord!](https://discord.gg/k4fb9TZfcK)'},
                        )
                    message.author.send(embed)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 60000)
                        })
                    message.delete();
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                        .setTitle(`Not your server!`)
                        .setDescription(`Not your server! Please do not try and view kick not from your server!`)
                        .setFooter(message.author.tag)
                    message.author.send(embed)
                }
            })
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
                .setTitle(`No Perms!`)
                .setDescription(`No permission! If you continue the administration team will ban you!`)
                .setFooter(message.author.tag)
            message.channel.send(embed)
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })

        }
    }

}