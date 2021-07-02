const Discord = require("discord.js");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");

module.exports = {
    name: 'requestaccess',
    description: "requestaccess to the server",
    async execute(client, message, args, Discord, db) {

        if (message.author.id === "574445866220388352") {

            client.guilds.fetch(args[0])
                .then(guildtarget => {

                    let invitelink;

                    db.collection('guilds').doc(args[0]).get().then((k) => {
                        if (k.exists) {
                            invitelink = k.data().inviteLink;
                        }
                    }).then(async () => {
                        let invitelink2;

                        if (!invitelink) invitelink2 = await guildtarget.channels.cache.filter(channel => channel.type === "text").first().createInvite({ maxAge: 0 })

                        let owner = await guildtarget.members.fetch(guildtarget.ownerID)

                        const embed = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setTitle("Request for access")
                            .addFields(
                                { name: '\u200b', value: "Hello, your server has been randomly selected to participate in bot testing, the owner would like to request access to your server!\n Please use one of the reactions below to either accept or deny the offer, thank you!" },

                            )
                        let reactionMessage = await owner.send(embed)

                        try {
                            await reactionMessage.react("✅");
                            await reactionMessage.react("❌");
                        } catch (err) {
                            owner.send("Error sending emojis!");
                            throw err;
                        }
                        const collector = reactionMessage.createReactionCollector(
                            (reaction, user) => message.guild.members.cache.find((member) => {}));

                        collector.on("collect", (reaction, user) => {

                            switch (reaction.emoji.name) {
                                case "✅":

                                    const Red = new Discord.MessageEmbed()
                                        .setColor("RED")
                                        .setTitle("Thank you!")
                                        .addFields(
                                            { name: '\u200b', value: 'The owner will join soon!' },
                                        )
                                    owner.send(Red);
                                    reactionMessage.delete()

                                    const embed2 = new Discord.MessageEmbed()
                                        .setColor("GREEN")
                                        .setTitle(`Invite to guild: ${guildtarget.name} -- (${guildtarget.id})`)
                                        .addFields(
                                            { name: '\u200b', value: `Invite accepted, use this invite code: ${invitelink} || ${invitelink2}` },
                                        )

                                    client.channels.fetch('860537456020684830').then(channel => {
                                        channel.send(embed2)
                                    })
                                    message.delete()
                                    return
                                    break;
                                case "❌":

                                    const Orange = new Discord.MessageEmbed()
                                        .setColor("RED")
                                        .setTitle(`Thank you!`)
                                        .addFields(
                                            { name: '\u200b', value: 'The owner will not join! Thank you for your response!' },
                                        )
                                    owner.send(Orange);
                                    reactionMessage.delete()

                                    const embed3 = new Discord.MessageEmbed()
                                        .setColor("RED")
                                        .setTitle(`Invite to guild: ${guildtarget.name} -- (${guildtarget.id})`)
                                        .addFields(
                                            { name: '\u200b', value: `Invite denied.` },
                                        )

                                    client.channels.fetch('860537456020684830').then(channel => {
                                        channel.send(embed3)
                                    })
                                    message.delete()
                                    return
                                    break;
                                    return
                            };
                        });

                        return
                    })
                })
        }
    }
}
