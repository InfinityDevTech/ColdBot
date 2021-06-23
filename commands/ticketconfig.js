const Discord = require("discord.js");
const randomstring = require("randomstring");
let dayjs = require('dayjs');
const ticket = require("./ticket");

module.exports = {
    name: 'ticketconfig',
    description: "Csets the ticket category",
    execute(client, message, args, Discord, db) {
        
console.log(args[0])

        let channelID = args[0];
        let categorychannel = message.guild.cache.channels.get(channelID);

        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!categorychannel.type === 'category') return message.channel.send("That is not a category!\n Please right click on the category you want and click 'copy ID' and use that as your arguement!"); 
            if (args[0].length = 0) return message.channel.send("No arguements specified!")

            let ticketchannel;

            db.collection('guilds').doc(message.guild.id).update({
                'ticketParent': channelID
            })

        }
    }
}