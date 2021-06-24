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

        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!args[0]) return message.channel.send("No arguements specified!")
            if (!args[0].isNaN) return message.channel.send("That is not a number!")
            if (!categorychannel.type === 'category') return message.channel.send("That is not a category!\n Please right click on the category you want and click 'copy ID' and use that as your arguement!"); 

            let ticketchannel;

            db.collection('guilds').doc(message.guild.id).update({
                'ticketParent': channelID
            })

        }
    }
}