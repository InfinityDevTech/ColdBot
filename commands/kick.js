const Discord = require("discord.js");
const randomstring = require("randomstring");
let dayjs = require('dayjs');

module.exports = {
    name: 'kick',
    usage: 'kick <USER>',
    description: "Kicks A User!",
    cooldown: 5,
    async execute(client, message, args, Discord, db) {

        if (!message.guild) return;

        if (message.member.hasPermission('KICK_MEMBERS')) {

            let reason = args.slice(1).join(" ");

            if (!reason) reason = "Reason Not Present";

            const member = message.mentions.users.first();

            let dateobj = new Date();

            let day = ("0" + dateobj.getDate()).slice(-2);

            let month = ("0" + (dateobj.getMonth() + 1)).slice(-2);


            let date = `${dateobj.getFullYear()}/${month}/${day}`;

            let time = `${dateobj.getHours()}:${dateobj.getMinutes()}:${dateobj.getSeconds()}`;

            let kickid = randomstring.generate(10);

            if (member) {
                const userId = message.mentions.users.first().id
                const member2 = await message.guild.members.fetch({user: userId})

                const memberTarget = member2;
                if (!memberTarget.hasPermission('ADMINISTRATOR')) {
                    memberTarget.kick();

                    db.collection('kicks').doc(kickid).set({
                        'kickGuildID' : message.guild.id,
                        'KickID': kickid,
                        'KickReason': reason,
                        'adminWhoKicked' : message.author.tag,
                        'adminWhoKickedID' : message.author.id,
                        'KickedUser': member.tag,
                        'KickedUserID': member.id,
                        'KickDate': date,
                        'KickTime' : time
                    })
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle(`Kicked User`)
                    .setDescription(`Kicked the user **${member.tag}**, with the reason **${reason}**. The kickID is **${kickid}**`)
                    .setFooter(message.author.tag)
                  message.author.send(embed);
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle(`Error : That user is an admin!`)
                    .setDescription(`Admins have to be kicked manually, or they have to be removed of their roles then kicked`)
                    .setFooter(message.author.tag)
                  message.channel.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })
                }
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                    .setTitle(`Errror : member not found`)
                    .setDescription(`That user was not found! Are you sending the command right?`)
                    .setFooter(message.author.tag)
                  message.channel.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                    })
            }
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
        message.delete();
    }
}