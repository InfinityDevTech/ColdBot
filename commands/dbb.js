const Discord = require("discord.js");
const randomstring = require("randomstring");
let dayjs = require('dayjs');

module.exports = {
    name: 'dbb',
    description: "Checks ban logs",
    execute(client, message, args, Discord, db) {

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
                      .setDescription("No arguements specified!")
                    message.channel.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                      })
                      message.delete();
                    return;
        }

if (message.member.hasPermission('ADMINISTRATOR')) {

        let id = args[0];

        let banGuildID;
        let BanID;
        let BanReason;
        let adminWhoBanned;
        let BannedUser;
        let BannedUserID;
        let BanDate;
        let BanTime
        
        db.collection('bans').doc(id).get().then((q) => {
            if (q.exists) {
                banGuildID = q.data().banGuildID;
                BanID = q.data().BanID;
                BanReason = q.data().BanReason;
                adminWhoBanned = q.data().adminWhoBanned;
                BannedUser = q.data().BannedUser;
                BannedUserID = q.data().BannedUserID;
                BanDate = q.data().BanDate;
                BanTime = q.data().BanTime;
            }
            
        }).then(() => {

            if(banGuildID === message.guild.id) {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle(`Ban Info: `)
            .addFields(
              { name: '\u200b', value: `BanID: ${BanID}` },
              { name: '\u200b', value: `Ban Reason: ${BanReason}` },
              { name: '\u200b', value: `Administrator who banned the user: ${adminWhoBanned}` },
              { name: '\u200b', value: `Banned User: ${BannedUser}` },
              { name: '\u200b', value: `Banned User ID: ${BannedUserID}` },
              { name: '\u200b', value: `Ban Date: ${BanDate}` },
              { name: '\u200b', value: `Ban Time: ${BanTime}` },
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
                        .setDescription(`Not your server! Please do not try and view bans not from your server!`)
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