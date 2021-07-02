const Discord = require("discord.js");
const { resourcesettings } = require("googleapis/build/src/apis/resourcesettings");

module.exports = {
    name: 'requestaccess',
    description: "requestaccess to the server",
    async execute(client, message, args, Discord, db) {
        if (message.author.id === "574445866220388352") {

            let targetserver = client.guilds.cache.get(args[0]);
            owner = client.users.cache.get(targetserver.ownerID)

            let invitelink;

            db.collection('guilds').doc(args[0]).get().then((k) => {
                if (k.exists) {
                    invitelink = k.data().inviteLink;
                }
            }).then(async () => {

                if (!invitelink) await targetserver.channels.cache.filter(channel => channel.type === "text").first().createInvite({ maxAge: 0 }).then(async (invite) => {
                        

                    const embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle("Request for access")
                        .addFields(
                            { name: '\u200b', value: "Hello, your server has been randomly selected to participate in bot testing, the owner would like to request access to your server!\n Please use one of the reactions below to either accept or deny the offer, thank you!" },

                        )
                    const reactionMessage = await client.users.cache.get(targetserver.ownerID).send(embed);

                    try {
                        await reactionMessage.react("✅");
                        await reactionMessage.react("❌");
                    } catch (err) {
                        channel.send("Error sending emojis!");
                        throw err;
                    }
                    const collector = reactionMessage.createReactionCollector(
                        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id),
                        { dispose: true }
                    );

                    collector.on("collect", (reaction, user, invitelink) => {

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
                                        .setTitle(`Invite to guild: ${targetserver.name} -- (${targetserver.id})`)
                                        .addFields(
                                            { name: '\u200b', value: `Invite accepted, use this invite code: ${invite}` },
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
                                        .setTitle(`Invite to guild: ${targetserver.name} -- (${targetserver.id})`)
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
                    })
                    return
                })
        }
    }
}
