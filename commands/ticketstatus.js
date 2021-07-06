const Discord = require("discord.js");
const randomstring = require("randomstring");
let dayjs = require('dayjs');

module.exports = {
    name: 'ticketstatus',
    usage: 'ticketcontrols',
    description: "Shows the status for tickets!",
    aliases: ['ticketstats', 'tstatus'],
    cooldown: 60,
    execute(client, message, args, Discord, db) {

       if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                      .setColor("BLUE")
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

        let guildID;
        let guildName;
        let guildOwnerID;
        let ticketDone;
        let ticketID
        
        db.collection('tickets').doc(id).get().then((q) => {
            if (q.exists) {
                guildID = q.data().guildID;
                guildName = q.data().guildName;
                guildOwnerID = q.data().guildOwnerID;
                ticketDone = q.data().ticketDone;
                ticketID = q.data().ticketID;
            }
            
        }).then(() => {

           if(ticketDone.length === 0) ticketDone = "No status set!"
            if(guildID === message.guild.id) {
            const embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor("Ticket Status")
            .addFields(
              { name: '\u200b', value: `Server Name: ${guildName}` },
              { name: '\u200b', value: `Ticket Done: ${ticketDone}` },
              { name: '\u200b', value: `Ticket ID: ${ticketID}` },
              
            )
            .setFooter(message.author.tag)
          message.author.send(embed)
          .then(msg => {
              setTimeout(() => msg.delete(), 60000)
            })
            message.delete();
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
                        .setTitle(`Not your server!`)
                        .setDescription(`Not your server! Please do not try and view tickets not from your server!`)
                        .setFooter(message.author.tag)
                    message.author.send(embed)
        }
        })
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle(`No Perms!`)
            .setDescription(`No permission!`)
            .setFooter(message.author.tag)
          message.channel.send(embed)
    .then(msg => {
        setTimeout(() => msg.delete(), 10000)
    })

        }
    }

}