const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    usage: 'ping',
    description: "Shows bot ping stats",
    cooldown: 60,
    execute(client, message, args, Discord, db) {
        if (!message.guild) return;

        message.channel.send('Calculating ping...').then(resultMessage => {
            const botping = resultMessage.createdTimestamp - message.createdTimestamp

            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle("Bot info: ")
            .addFields(
                { name: 'Bot ping', value: `The bots ping is \`${botping}\`ms, the API ping is \`${client.ws.ping}\`` },

            )
        message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 20000)
            })
        message.delete();
        resultMessage.delete()
        

        })

    }
}