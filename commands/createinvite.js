const Discord = require("discord.js");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");

module.exports = {
    name: 'createinvite',
    description: "createinvite to the server",
    async execute(client, message, args, Discord, db) {

        if (message.author.id === "574445866220388352") {

            client.guilds.fetch(args[0])
                .then(async guildtarget => {

                    let invitelink2;

                        if (!invitelink2) invitelink2 = await guildtarget.channels.cache.filter(channel => channel.type === "text").first().createInvite({ maxAge: 0 })
                
                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                      .setAuthor("Done!")
                      .addFields(
                        { name: '\u200b', value: `Done! join here: ${invitelink2}`},
                        
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