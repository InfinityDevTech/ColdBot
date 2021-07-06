const Discord = require("discord.js");

module.exports = {
    name: 'logchannel',
    usage: 'logchannel <TAG-CHANNEL-HERE>',
    description: "Changes the log channel for anything cold",
    aliases: ['configlogs', 'botlogs'],
    cooldown: 60,
    execute(client, message, args, Discord, db){
        let channelID = args[0];
        let categorychannel = message.guild.channels.cache.get(channelID);



        test = args[0]
        let channelid2 = args[0]

        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!args[0]) {
         
                const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("ERROR!")
                    .addFields(
                        { name: '\u200b', value: "No channel was specified! Please write your command like this: `logchannel <TAG THE CHANNEL>`" },

                    )
                message.author.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 15000)
                    })
                message.delete();
            } else {
                let channel = message.mentions.channels.first();
                if (channel) {
                    let channelid = message.mentions.channels.first().id;
                
                if(message.guild.channels.cache.has(channelid)) {
               
                db.collection('guilds').doc(message.guild.id).update({
                    'logChannel' : channelid
                })
                const embed2 = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle(`Log channel is now set to ${channelid}`)
                message.author.send(embed2)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 60000)
                    })
                    message.delete();
                    } else {
                        message.channel.send("THAT CHANNEL DOES NOT EXIST")
                    }
                    }
            }
             
        }
          
    }
}