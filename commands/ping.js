const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    usage: 'ping',
    description: "Shows bot ping stats",
    cooldown: 60,
    execute(client, message, args, Discord, db) {
        if (!message.guild) return;

        let yourping = new Date().getTime() - message.createdTimestamp
        let botping = Math.round(client.ws.ping)



        const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle("Bot info: ")
            .addFields(
                { name: 'Bot ping', value: `The bots ping is ${botping}ms` },

            )
        message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
            })
        message.delete();

    }
}