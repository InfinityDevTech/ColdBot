const Discord = require("discord.js");
const randomstring = require("randomstring");
let dayjs = require('dayjs');
const ticket = require("./ticket");

module.exports = {
    name: 'ticketconfig',
    description: "Csets the ticket category",
    execute(client, message, args, Discord, db) {

        let channelID = args[0];
        let categorychannel = message.guild.channels.cache.get(channelID);

        test = args[0]

        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!args[0]) {
                const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("ERROR!")
                    .addFields(
                        { name: '\u200b', value: "No message was specified! Please write your command like this: `ticketconfig <ID OF CATEGORY>`" },

                    )
                message.author.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 15000)
                    })
                message.delete();

            } else {

                if (isNaN(test)) {

                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle("ERROR!")
                        .addFields(
                            { name: '\u200b', value: "That is not a number! Please write your command like this: `ticketconfig <ID OF CATEGORY>`" },

                        )
                    message.author.send(embed)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 15000)
                        })
                    message.delete();

                } else {
                    if (!categorychannel.type === 'category') {
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle("ERROR!")
                            .addFields(
                                { name: '\u200b', value: "That is not a category! Please write your command like this: `ticketconfig <ID OF CATEGORY>`" },

                            )
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 15000)
                            })
                        message.delete();

                    } else {

                        if (message.guild.channels.exists(args[0])) return message.channel.send("WORKS")

                        let ticketchannel;
                        

                        db.collection('guilds').doc(message.guild.id).update({
                            'ticketParent': channelID
                        })
                        
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle("Category is now set to:")
                            .addFields(
                                { name: '\u200b', value: `Ticket category is now set to\`${args[0]}\`!` }
                            )
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 15000)
                            })
                        message.delete();
                        
                    }
                }
            }
        }
    }
}