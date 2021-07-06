const Discord = require("discord.js");
const Perspective = require('perspective-api-client')

module.exports = {
    name: 'analyze-message',
    usage: 'analyze-message <MESSAGE-TO-ANALYZE>',
    description: "The command analyzes a message using the power of Artificial-Intelligence",
    aliases: ['message-analyze', 'messageanalyze', 'analyzemessage'],
    cooldown: 60,
    async execute(client, message, args, Discord, db) {

        if (!message.guild) return;
        if (message.member.hasPermission('ADMINISTRATOR')) {

            let messagetocheck = args.slice(1).join(" ");

            if (!messagetocheck) return message.author.send("No message sent!");

            const perspective = new Perspective({ apiKey: process.env.API_KEY })
            const toxic = await perspective.analyze(messagetocheck);
            let obj = JSON.parse(JSON.stringify(toxic))

            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Toxicity Report: ")
              .addFields(
                { name: '\u200b', value:  `The toxicity of this message is \`${Math.ceil(obj.attributeScores.TOXICITY.summaryScore.value*100)}\`%`},
                
              )
            message.author.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
              })
              message.delete();

        }
    }
}